// backend/routes/api/contact.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Bring in the Message model we just created
const Message = require('../../models/Message');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  // If email credentials are provided, use them; otherwise return null
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log('Creating email transporter with:', process.env.EMAIL_USER);
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
  console.log('Email credentials not found in environment variables');
  console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
  console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
  return null;
};

// @route   POST api/contact
// @desc    Save a contact form message and send email notification
// @access  Public
router.post('/', async (req, res) => {
  // Get the data from the request body
  const { name, email, subject, message } = req.body;

  // Input validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      msg: 'Please provide name, email, and message'
    });
  }

  try {
    // Try to save to database
    try {
      const newMessage = new Message({
        name,
        email,
        subject: subject || 'Contact Form Submission',
        message,
      });
      await newMessage.save();
      console.log('✅ Message saved to database');
    } catch (dbError) {
      // If database save fails, log but continue with email
      console.log('Database save skipped:', dbError.message);
    }

    // Send email notification
    const transporter = createTransporter();
    
    if (transporter) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'krishnaspattel@gmail.com',
          subject: `FitHub Contact Form: ${subject || 'New Message'}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
              <div style="background: linear-gradient(135deg, #ff8c00 0%, #ff6600 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
              </div>
              <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #333; margin-top: 0;">Message Details</h2>
                
                <div style="margin-bottom: 20px;">
                  <strong style="color: #ff8c00; display: block; margin-bottom: 5px;">Name:</strong>
                  <p style="margin: 0; color: #333; font-size: 16px;">${name}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <strong style="color: #ff8c00; display: block; margin-bottom: 5px;">Email:</strong>
                  <p style="margin: 0; color: #333; font-size: 16px;">
                    <a href="mailto:${email}" style="color: #ff8c00; text-decoration: none;">${email}</a>
                  </p>
                </div>
                
                ${subject ? `
                <div style="margin-bottom: 20px;">
                  <strong style="color: #ff8c00; display: block; margin-bottom: 5px;">Subject:</strong>
                  <p style="margin: 0; color: #333; font-size: 16px;">${subject}</p>
                </div>
                ` : ''}
                
                <div style="margin-bottom: 20px;">
                  <strong style="color: #ff8c00; display: block; margin-bottom: 5px;">Message:</strong>
                  <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #ff8c00; margin-top: 10px;">
                    <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center;">
                  <p style="color: #666; font-size: 14px; margin: 0;">
                    This message was sent from the FitHub contact form.
                  </p>
                  <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                    Reply directly to: <a href="mailto:${email}" style="color: #ff8c00; text-decoration: none;">${email}</a>
                  </p>
                </div>
              </div>
            </div>
          `
        };

        console.log('Attempting to send email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!', info.messageId);
        console.log('Email sent to: krishnaspattel@gmail.com');
      } catch (emailError) {
        console.error('Email sending failed:', emailError.message);
        console.error('Full error:', emailError);
        // Don't fail the request if email fails, but log it
        throw new Error(`Email sending failed: ${emailError.message}`);
      }
    } else {
      console.log('Email not configured. Set EMAIL_USER and EMAIL_PASS in .env file');
      throw new Error('Email configuration is missing. Please set EMAIL_USER and EMAIL_PASS in .env file');
    }

    // Send a success response back to the frontend
    res.status(200).json({ 
      success: true,
      msg: 'Message received and sent successfully!'
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({
      success: false,
      msg: 'Server error while processing your message'
    });
  }
});

module.exports = router;
