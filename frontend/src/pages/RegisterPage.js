import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import {
  TextField, Button, Divider, Alert, Box, CircularProgress, Link, Typography
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import api from '../utils/api';
import { setCredentials } from '../features/auth/authSlice';
import AuthLayout from '../components/auth/AuthLayout';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- Standard Register ---
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/register', formData);
      dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- Google Register ---
  const googleRegister = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await api.post('/auth/google', { token: tokenResponse.access_token });
        dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
        navigate('/home');
      } catch (err) {
        console.error('Frontend Auth Error:', err);
        const backendMsg = err.response?.data?.error || err.message;
        setError(backendMsg || 'Google signup failed.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError('Google Sign Up failed'),
  });

  return (
    <AuthLayout title="Create Account" subtitle="Join FitHub today">
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={name}
          onChange={onChange}
          margin="normal"
          variant="outlined"
          required
          sx={{ mb: 1, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
        />
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
          helperText="At least 6 characters"
          required
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          disabled={loading}
          sx={{
            mt: 2,
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
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
        </Button>
      </form>

      <Divider sx={{ my: 3, '&::before, &::after': { borderColor: '#333' } }}><Typography variant="caption" sx={{ color: '#666' }}>OR</Typography></Divider>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={() => googleRegister()}
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
        Sign up with Google
      </Button>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Link component={RouterLink} to="/login" underline="hover" sx={{ color: '#fff', fontWeight: 500 }}>
          Already have an account? <span style={{ color: '#ff9800' }}>Sign In</span>
        </Link>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
