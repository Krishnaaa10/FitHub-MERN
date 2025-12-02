import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { checkBackendHealth, getApiUrl } from '../utils/api';
import { setAuthToken, setUser } from '../utils/auth';
import GoogleLoginButton from '../components/auth/GoogleLoginButton';
import './AuthPages.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);
  const [focusedField, setFocusedField] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkConnection = async () => {
      const health = await checkBackendHealth();
      setBackendStatus(health);
      if (!health.success) {
        console.error('Backend connection failed:', health);
      }
    };
    checkConnection();
  }, []);

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = `rgba(255, 140, 0, ${this.opacity})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Connect nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(255, 140, 0, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { name, email, password } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/api/users/register', formData);
      setAuthToken(res.data.token);
      setUser(res.data.user);
      navigate('/home');
    } catch (err) {
      console.error('Registration error:', err);
      if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        const apiUrl = getApiUrl();
        setError(`Cannot connect to server. Please make sure the backend server is running.`);
      } else if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        setError('Request timeout. The server is taking too long to respond. Please try again.');
      } else if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (err.response?.status === 404) {
        setError('API endpoint not found. Please check the backend server configuration.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setGoogleLoading(true);
      setError('');
      
      const response = await api.post('/api/users/google-login', {
        token: credentialResponse.credential
      });
      
      setAuthToken(response.data.token);
      setUser(response.data.user);
      navigate('/home');
    } catch (err) {
      console.error('Google signup error:', err);
      setError(err.response?.data?.message || 'Failed to sign up with Google. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google signup was unsuccessful. Please try again or use another method.');
  };

  return (
    <div className="auth-page-modern">
      <canvas ref={canvasRef} className="particles-canvas"></canvas>
      
      <div className="auth-split-container">
        {/* Left Side - Visual/Info */}
        <div className="auth-visual-side">
          <div className="auth-visual-content">
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
            <h1 className="auth-visual-title">
              Start Your <span className="gradient-text">Journey</span>
            </h1>
            <p className="auth-visual-subtitle">
              Join thousands of members achieving their fitness goals
            </p>
            <div className="auth-features">
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <span>Set Goals</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📈</div>
                <span>Track Progress</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🏆</div>
                <span>Win Challenges</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📈</div>
                <span>Track Progress</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🏆</div>
                <span>Win Challenges</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-side">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h2 className="auth-form-title">Create Account</h2>
              <p className="auth-form-subtitle">Sign up to get started</p>
            </div>

            {backendStatus && !backendStatus.success && (
              <div className="auth-error-message">
                ⚠️ Connection issue: {backendStatus.error || 'Cannot reach server'}
              </div>
            )}

            {error && (
              <div className="auth-error-message animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={onFormSubmit} className="auth-form">
              <div 
                className={`auth-input-group ${focusedField === 'name' ? 'focused' : ''} ${name ? 'has-value' : ''}`}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField('')}
              >
                <label className="auth-input-label">Username</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  className="auth-input"
                  required
                />
                <div className="input-border"></div>
              </div>

              <div 
                className={`auth-input-group ${focusedField === 'email' ? 'focused' : ''} ${email ? 'has-value' : ''}`}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
              >
                <label className="auth-input-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  className="auth-input"
                  required
                />
                <div className="input-border"></div>
              </div>

              <div 
                className={`auth-input-group ${focusedField === 'password' ? 'focused' : ''} ${password ? 'has-value' : ''}`}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
              >
                <label className="auth-input-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  className="auth-input"
                  required
                  minLength="6"
                />
                <div className="input-border"></div>
              </div>

              <button 
                type="submit" 
                className={`auth-submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-loader">
                    <span></span><span></span><span></span>
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>

              <div className="divider">OR</div>
              
              <div className="google-auth-section">
                <GoogleLoginButton 
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  buttonText="Sign up with Google"
                  disabled={loading || googleLoading}
                />
                {googleLoading && <div className="loading">Creating your account with Google...</div>}
              </div>
            </form>

            <div className="auth-footer-links">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
