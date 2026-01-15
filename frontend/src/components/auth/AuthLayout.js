import React from 'react';
import { Box, Paper, Typography, Grid, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import loginBg from '../../assets/login_bg.png';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff9800',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            ::selection {
                background: #ff9800;
                color: #000;
            }
        `
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.05)', // Glassy feel
            transition: 'all 0.3s ease',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255,255,255,0.1)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            },
            '&.Mui-focused fieldset': { borderColor: '#ff9800' },
          },
          '& .MuiInputLabel-root': { color: '#666' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#ff9800' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: 'none',
          transition: 'transform 0.2s',
          '&:active': { transform: 'scale(0.98)' }
        },
      },
    },
  },
});

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
        <CssBaseline />

        {/* Left Side - Image (Flex: 1.4) */}
        <Box
          sx={{
            flex: { xs: 0, md: 1.4 },
            display: { xs: 'none', md: 'block' },
            backgroundImage: `url(${loginBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#111',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          {/* Brand Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%)', // Cinematic Gradient
              p: 8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo area */}
            <Typography
              variant="h4"
              sx={{
                color: '#ff9800',
                fontWeight: 900,
                letterSpacing: '2px',
                animation: 'fadeInUp 0.8s ease-out'
              }}
            >
              FITHUB
            </Typography>

            {/* Quote area */}
            <Box sx={{ animation: 'fadeInUp 1s ease-out 0.2s backwards' }}>
              <Typography variant="h2" sx={{ fontWeight: 800, color: '#fff', mb: 2, lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                BUILD STRENGTH.<br />
                TRANSFORM YOUR LIFE.
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400, maxWidth: '500px' }}>
                Join thousands of elite athletes tracking their progress and crushing their goals.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Side - Form (Flex: 1) */}
        <Box
          component={Paper}
          elevation={0}
          square
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#000000',
            background: 'radial-gradient(circle at top right, #1a1a1a 0%, #000000 100%)', // Subtle lighting
            borderLeft: '1px solid #111'
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: '420px',
              animation: 'fadeIn 1s ease-out 0.4s backwards' // Slight delay for form
            }}
          >
            <Box sx={{ mb: 5, textAlign: 'center' }}>
              <Typography component="h1" variant="h4" sx={{ color: '#fff', mb: 1 }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body1" sx={{ color: '#888' }}>
                  {subtitle}
                </Typography>
              )}
            </Box>

            <Box sx={{ width: '100%' }}>{children}</Box>

            <Box sx={{ mt: 5 }}>
              <Typography variant="body2" sx={{ color: '#333' }} align="center">
                &copy; {new Date().getFullYear()} FitHub.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AuthLayout;
