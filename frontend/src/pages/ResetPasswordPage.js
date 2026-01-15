import React, { useState } from 'react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import {
    TextField, Button, Alert, Box, CircularProgress, Link
} from '@mui/material';
import api from '../utils/api';
import AuthLayout from '../components/auth/AuthLayout';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { resetToken } = useParams();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await api.put(`/auth/resetpassword/${resetToken}`, { password });
            setMessage('Password reset successful! Redirecting to login...');

            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid or expired token.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Reset Password" subtitle="Enter your new password below">
            {message && <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <form onSubmit={onSubmit}>
                <TextField
                    fullWidth
                    label="New Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    required
                    helperText="At least 6 characters"
                />
                <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
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

export default ResetPasswordPage;
