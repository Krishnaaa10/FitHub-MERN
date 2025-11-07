import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage.css';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className={`landing-page ${isLoaded ? 'loaded' : ''}`}>
      {/* Navigation Bar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">FitHub</Link>
          </div>
          
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="/register" className="nav-cta" onClick={() => setIsMobileMenuOpen(false)}>Join Now</Link>
          </div>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-video-container">
          <video
            className="hero-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://videos.pexels.com/video-files/3044473/3044473-hd_1920_1080_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">Join the #1 Fitness Community</div>
          <h1 className="hero-headline">
            <span className="hero-line-1">Transform Your Body.</span>
            <span className="hero-line-2">Elevate Your Life.</span>
          </h1>
          <p className="hero-subheadline">
            Join thousands of members achieving their fitness goals with state-of-the-art equipment, 
            expert trainers, and a supportive community that pushes you to be your best.
          </p>
          <div className="hero-cta-group">
            <Link to="/register" className="hero-cta-button primary">
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Why FitHub Section */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title">Why FitHub?</h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon-wrapper">
                <svg className="why-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="why-title">Expert Trainers</h3>
              <p className="why-text">Certified professionals dedicated to your success.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-wrapper">
                <svg className="why-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 className="why-title">State-of-the-Art Facility</h3>
              <p className="why-text">The latest equipment in a clean, motivating environment.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-wrapper">
                <svg className="why-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="why-title">Diverse Classes</h3>
              <p className="why-text">From high-intensity HIIT to calming Yoga, we have it all.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Classes Section */}
      <section className="classes-section">
        <div className="container">
          <h2 className="section-title">Our Most Popular Classes</h2>
          <div className="classes-grid">
            <div className="class-card">
              <div className="class-image">
                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&q=80" alt="Power Yoga" />
                <div className="class-overlay"></div>
              </div>
              <div className="class-content">
                <h3 className="class-title">Power Yoga</h3>
                <div className="class-meta">
                  <span className="class-duration">60 min</span>
                  <span className="class-intensity">Intermediate</span>
                </div>
                <p className="class-description">
                  Build strength, flexibility, and inner peace through dynamic yoga flows.
                </p>
                <Link to="/booking" className="class-link">Book Class →</Link>
              </div>
            </div>
            <div className="class-card">
              <div className="class-image">
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&q=80" alt="CrossFit" />
                <div className="class-overlay"></div>
              </div>
              <div className="class-content">
                <h3 className="class-title">CrossFit</h3>
                <div className="class-meta">
                  <span className="class-duration">45 min</span>
                  <span className="class-intensity">Advanced</span>
                </div>
                <p className="class-description">
                  High-intensity functional movements that will push your limits.
                </p>
                <Link to="/booking" className="class-link">Book Class →</Link>
              </div>
            </div>
            <div className="class-card">
              <div className="class-image">
                <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop&q=80" alt="Spin" />
                <div className="class-overlay"></div>
              </div>
              <div className="class-content">
                <h3 className="class-title">Spin</h3>
                <div className="class-meta">
                  <span className="class-duration">50 min</span>
                  <span className="class-intensity">All Levels</span>
                </div>
                <p className="class-description">
                  High-energy cycling classes that burn calories and boost endurance.
                </p>
                <Link to="/booking" className="class-link">Book Class →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trainer Spotlight Section */}
      <section id="trainers" className="trainers-section">
        <div className="container">
          <h2 className="section-title">Meet Our Expert Trainers</h2>
          <p className="section-subtitle">Certified professionals dedicated to your success</p>
          <div className="trainers-grid">
            <div className="trainer-card">
              <div className="trainer-image">
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face" alt="Alex Martinez" />
              </div>
              <div className="trainer-info">
                <h3 className="trainer-name">Alex Martinez</h3>
                <p className="trainer-specialty">Strength & Conditioning</p>
                <p className="trainer-bio">10+ years experience, NASM certified</p>
              </div>
            </div>
            <div className="trainer-card">
              <div className="trainer-image">
                <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face" alt="Jessica Kim" />
              </div>
              <div className="trainer-info">
                <h3 className="trainer-name">Jessica Kim</h3>
                <p className="trainer-specialty">Yoga & Flexibility</p>
                <p className="trainer-bio">RYT-500 certified, 8 years teaching</p>
              </div>
            </div>
            <div className="trainer-card">
              <div className="trainer-image">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" alt="Marcus Johnson" />
              </div>
              <div className="trainer-info">
                <h3 className="trainer-name">Marcus Johnson</h3>
                <p className="trainer-specialty">HIIT & Cardio</p>
                <p className="trainer-bio">CrossFit Level 2, 12 years experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Members Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <blockquote className="testimonial-text">
                "FitHub has completely transformed my fitness journey. The trainers are amazing, 
                and the community is so supportive. I've never felt stronger!"
              </blockquote>
              <div className="testimonial-author-info">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" 
                  alt="Sarah Johnson" 
                  className="testimonial-avatar"
                />
                <div>
                  <p className="testimonial-author-name">Sarah Johnson</p>
                  <p className="testimonial-author-role">Member since 2023</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <blockquote className="testimonial-text">
                "The state-of-the-art equipment and diverse class offerings keep me motivated. 
                Best fitness investment I've ever made!"
              </blockquote>
              <div className="testimonial-author-info">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                  alt="Michael Chen" 
                  className="testimonial-avatar"
                />
                <div>
                  <p className="testimonial-author-name">Michael Chen</p>
                  <p className="testimonial-author-role">Member since 2022</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <blockquote className="testimonial-text">
                "I've tried many gyms, but FitHub's community and expert trainers make all the difference. 
                The results speak for themselves!"
              </blockquote>
              <div className="testimonial-author-info">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" 
                  alt="Emily Rodriguez" 
                  className="testimonial-avatar"
                />
                <div>
                  <p className="testimonial-author-name">Emily Rodriguez</p>
                  <p className="testimonial-author-role">Member since 2023</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <blockquote className="testimonial-text">
                "The premium membership is worth every penny. Unlimited classes and the best equipment 
                I've ever used. Highly recommend!"
              </blockquote>
              <div className="testimonial-author-info">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" 
                  alt="David Park" 
                  className="testimonial-avatar"
                />
                <div>
                  <p className="testimonial-author-name">David Park</p>
                  <p className="testimonial-author-role">Member since 2022</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <blockquote className="testimonial-text">
                "As a busy professional, FitHub's flexible schedule and variety of classes fit perfectly 
                into my lifestyle. Love it!"
              </blockquote>
              <div className="testimonial-author-info">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" 
                  alt="Lisa Thompson" 
                  className="testimonial-avatar"
                />
                <div>
                  <p className="testimonial-author-name">Lisa Thompson</p>
                  <p className="testimonial-author-role">Member since 2024</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <blockquote className="testimonial-text">
                "The trainers here are world-class. They push you to achieve goals you never thought possible. 
                This is more than a gym—it's a lifestyle."
              </blockquote>
              <div className="testimonial-author-info">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" 
                  alt="James Wilson" 
                  className="testimonial-avatar"
                />
                <div>
                  <p className="testimonial-author-name">James Wilson</p>
                  <p className="testimonial-author-role">Member since 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">🔒</div>
              <p className="trust-text">SSL Secured</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">✓</div>
              <p className="trust-text">Certified Trainers</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">⭐</div>
              <p className="trust-text">5-Star Rated</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">🏆</div>
              <p className="trust-text">Award Winning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Transform Your Life?</h2>
          <p className="cta-subtitle">Start your fitness journey today</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">Start Your Free Trial</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-logo">FitHub</h3>
              <p className="footer-description">
                Your ultimate destination for strength, wellness, and community.
              </p>
              <div className="footer-contact">
                <p>📍 123 Fitness Street, Health City, HC 12345</p>
                <p>📧 hello@fithub.com</p>
                <p>📞 (555) 123-4567</p>
              </div>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/video">Classes</Link></li>
                <li><a href="#trainers">Trainers</a></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Resources</h4>
              <ul className="footer-links">
                <li><a href="#blog">Blog</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#schedule">Class Schedule</a></li>
                <li><a href="#nutrition">Nutrition Guide</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Legal</h4>
              <ul className="footer-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#refund">Refund Policy</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Follow Us</h4>
              <div className="social-icons">
                <a href="#" className="social-icon" aria-label="Facebook" title="Facebook">📘</a>
                <a href="#" className="social-icon" aria-label="Instagram" title="Instagram">📷</a>
                <a href="#" className="social-icon" aria-label="Twitter" title="Twitter">🐦</a>
                <a href="#" className="social-icon" aria-label="YouTube" title="YouTube">📺</a>
                <a href="#" className="social-icon" aria-label="LinkedIn" title="LinkedIn">💼</a>
              </div>
              <div className="newsletter">
                <p className="newsletter-label">Subscribe to our newsletter</p>
                <form className="newsletter-form">
                  <input type="email" placeholder="Your email" className="newsletter-input" />
                  <button type="submit" className="newsletter-button">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} FitHub. All rights reserved.</p>
            <div className="footer-badges">
              <span>🔒 SSL Secured</span>
              <span>✓ Certified Trainers</span>
              <span>⭐ 5-Star Rated</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
