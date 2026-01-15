import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  TextField, Button, Divider, IconButton, Alert, Box, CircularProgress, Link, Typography
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import api from '../utils/api';
import { setCredentials } from '../features/auth/authSlice';
import AuthLayout from '../components/auth/AuthLayout';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- Standard Login ---
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', formData);
      dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
      navigate('/home'); // Redirect to dashboard/home
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // --- Google Login ---
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        // Exchange access token for JWT from backend
        const res = await api.post('/auth/google', { token: tokenResponse.access_token });
        dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
        navigate('/home');
      } catch (err) {
        setError(err.response?.data?.error || 'Google login failed.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError('Google Sign In failed'),
  });

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to continue to FitHub">
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          margin="normal"
          variant="outlined"
          required
          sx={{ mb: 1, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          margin="normal"
          variant="outlined"
          required
          sx={{ mb: 1, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 3 }}>
          <Link component={RouterLink} to="/forgot-password" underline="hover" sx={{ color: '#ff9800', fontWeight: 500 }}>
            Forgot Password?
          </Link>
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          disabled={loading}
          sx={{
            py: 1.8,
            mb: 3,
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '1rem',
            textTransform: 'none',
            background: 'linear-gradient(45deg, #FF9800 30%, #F57C00 90%)',
            color: '#fff',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            '&:hover': { background: 'linear-gradient(45deg, #F57C00 30%, #E65100 90%)' }
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
        </Button>
      </form>

      <Divider sx={{ my: 3, '&::before, &::after': { borderColor: '#333' } }}><Typography variant="caption" sx={{ color: '#666' }}>OR</Typography></Divider>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={() => googleLogin()}
        sx={{
          py: 1.5,
          borderRadius: '12px',
          borderColor: '#333',
          color: '#ccc',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.05)', color: '#fff' }
        }}
      >
        Sign in with Google
      </Button>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Link component={RouterLink} to="/register" underline="hover" sx={{ color: '#fff', fontWeight: 500 }}>
          Don't have an account? <span style={{ color: '#ff9800' }}>Sign Up</span>
        </Link>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
