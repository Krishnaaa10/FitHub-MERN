import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    TextField, Button, Alert, Box, CircularProgress, Link
} from '@mui/material';
import api from '../utils/api';
import AuthLayout from '../components/auth/AuthLayout';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const res = await api.post('/auth/forgotpassword', { email });
            setMessage(res.data.data || 'Email sent! Check your inbox.');
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Forgot Password" subtitle="Enter your email to receive a reset link">
            {message && <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <form onSubmit={onSubmit}>
                <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    required
                />

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={loading}
                    sx={{ mt: 2, mb: 2, py: 1.5, bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
                </Button>
            </form>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Link component={RouterLink} to="/login" underline="hover" sx={{ color: '#000', fontWeight: 500 }}>
                    Back to Login
                </Link>
            </Box>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
