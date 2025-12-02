import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useGoogleLoginMutation } from '../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../features/auth/authSlice';

const GoogleLoginButton = ({ buttonText = "Continue with Google", disabled = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleLogin] = useGoogleLoginMutation();

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await googleLogin({
        tokenId: credentialResponse.credential
      }).unwrap();

      dispatch(setCredentials({
        user: res.user,
        token: res.token
      }));

      // Redirect to main authenticated home screen
      navigate('/home');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <div className="google-login-container">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log('Google login failed')}
          useOneTap
          text={buttonText}
          size="large"
          width="100%"
          theme="outline"
          shape="rectangular"
          logo_alignment="left"
          disabled={disabled}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleLoginButton;
