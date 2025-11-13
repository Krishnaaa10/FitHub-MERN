import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { checkBackendHealth, getApiUrl } from '../utils/api';
import { setAuthToken, setUser } from '../utils/auth';
import './AuthPages.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);
  const [focusedField, setFocusedField] = useState('');
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

  const { email, password } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/users/login', formData);
      setAuthToken(res.data.token);
      setUser(res.data.user);
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      const apiUrl = getApiUrl();
      
      if (err.userMessage) {
        setError(err.userMessage);
      } else if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError(`Cannot connect to backend server at ${apiUrl}. Please check if the server is running and the API URL is configured correctly in environment variables.`);
      } else if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        setError(`Request timeout. The server at ${apiUrl} is taking too long to respond. This might be due to a cold start on Render. Please try again.`);
      } else if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (err.response?.status === 503) {
        setError('Service temporarily unavailable. The database might be connecting. Please try again in a moment.');
      } else if (err.response?.status === 404) {
        setError(`API endpoint not found at ${apiUrl}. Please check the backend server configuration.`);
      } else {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
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
              Welcome <span className="gradient-text">Back</span>
            </h1>
            <p className="auth-visual-subtitle">
              Continue your fitness journey and track your progress
            </p>
            <div className="auth-features">
              <div className="feature-item">
                <div className="feature-icon">💪</div>
                <span>Track Workouts</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <span>View Progress</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <span>Achieve Goals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-side">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h2 className="auth-form-title">Login</h2>
              <p className="auth-form-subtitle">Sign in to your account</p>
            </div>

            {backendStatus && !backendStatus.success && (
              <div className="auth-error-message">
                ⚠️ Connection issue: {backendStatus.error || 'Cannot reach server'}
                <br />
                <small style={{ fontSize: '0.85em', opacity: 0.8 }}>
                  Trying to connect to: {backendStatus.healthUrl || backendStatus.apiUrl || 'unknown'}
                </small>
              </div>
            )}

            {error && (
              <div className="auth-error-message animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={onFormSubmit} className="auth-form">
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
                  'Sign In'
                )}
              </button>
            </form>

            <div className="auth-footer-links">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="auth-link">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
