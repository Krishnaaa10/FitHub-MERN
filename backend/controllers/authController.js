const crypto = require('crypto');
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');

// Initialize Google OAuth2 client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/*
  @desc    Register user
  @route   POST /api/auth/register
  @access  Public
*/
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // 1. Basic Validation
  if (!name || !email || !password) {
    return next(new ErrorResponse('Please provide name, email and password', 400));
  }

  // 2. Check for duplicate user
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorResponse('User already exists', 400));
  }

  // 3. Create User
  const user = await User.create({
    name,
    email,
    password
  });

  // 4. Send Token
  sendTokenResponse(user, 201, res);
});

/*
  @desc    Login user
  @route   POST /api/auth/login
  @access  Public
*/
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Validate Input
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // 2. Check User & Password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // 3. Match Password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

/*
  @desc    Google Login/Register
  @route   POST /api/auth/google
  @access  Public
*/
exports.googleLogin = asyncHandler(async (req, res, next) => {
  const { token } = req.body; // Accept 'token' or 'tokenId'
  const idToken = token || req.body.tokenId;

  if (!idToken) {
    return next(new ErrorResponse('Google token is missing', 400));
  }

  let email, name, picture, googleId;

  try {
    // 1. Try treating it as an ID Token (JWT)
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    email = payload.email;
    name = payload.name;
    picture = payload.picture;
    googleId = payload.sub;

  } catch (idTokenError) {
    // 2. If ID Token fails, assume it's an Access Token (from useGoogleLogin)
    try {
      const fetchUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';

      const response = await axios.get(fetchUrl, {
        headers: { Authorization: `Bearer ${idToken}` }
      });

      const data = response.data;
      email = data.email;
      name = data.name;
      picture = data.picture;
      googleId = data.sub;
    } catch (accessTokenError) {
      console.error('❌ Google Auth Failed:', accessTokenError.message);
      return next(new ErrorResponse(`Google Auth Failed: ${accessTokenError.message}`, 400));
    }
  }

  if (!email) {
    return next(new ErrorResponse('Could not get email from Google account', 400));
  }

  try {
    // 3. Find or Create User
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user with Google ID if missing
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = 'google';
        if (picture) user.avatar = picture;
        await user.save();
      }
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
        authProvider: 'google',
        avatar: picture,
        password: crypto.randomBytes(32).toString('hex') + process.env.JWT_SECRET, // Secure dummy password
        isEmailVerified: true
      });
    }

    sendTokenResponse(user, 200, res);

  } catch (err) {
    console.error('❌ Google User Creation Error:', err);
    return next(new ErrorResponse('Google Login Process Failed', 500));
  }
});

/*
  @desc    Get current logged in user
  @route   GET /api/auth/me
  @access  Private
*/
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user
  });
});

/*
  @desc    Forgot Password
  @route   POST /api/auth/forgotpassword
  @access  Public
*/
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('Email not found', 404));
  }

  // Generate Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create URL
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const resetUrl = `${frontendUrl.replace(/\/$/, '')}/reset-password/${resetToken}`;

  const message = `You requested a password reset. Please click: \n\n ${resetUrl}`;
  const html = `
    <h3>Password Reset Request</h3>
    <p>Click details below to reset your password:</p>
    <a href="${resetUrl}" style="background:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Reset Password</a>
    <p>Or copy this link: ${resetUrl}</p>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'FitHub Password Reset',
      message,
      html
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.error('Email Send Error:', err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

/*
  @desc    Reset Password
  @route   PUT /api/auth/resetpassword/:resettoken
  @access  Public
*/
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid or expired token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});


// Helper: Send JWT Token
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
};
