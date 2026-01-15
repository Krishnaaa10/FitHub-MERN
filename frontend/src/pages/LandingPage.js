import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage.css';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="landing-page-new">
      {/* Navigation Bar */}
      <nav className={`navbar-new ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container-new">
          <div className="nav-logo-new">
            <Link to="/">Fit<span>Hub</span></Link>
          </div>

          <div className={`nav-links-new ${isMobileMenuOpen ? 'active' : ''}`}>
            <a href="#workouts" onClick={() => setIsMobileMenuOpen(false)}>Workouts</a>
            <a href="#yoga" onClick={() => setIsMobileMenuOpen(false)}>Yoga</a>
            <Link to="/register" className="nav-cta-new" onClick={() => setIsMobileMenuOpen(false)}>Join Now</Link>
          </div>

          <button className="mobile-menu-toggle-new" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section - Full Width */}
      <section className="hero-new">
        <div className="hero-background-new"></div>
        <div className="hero-content-new">
          <div className="hero-badge-new">Your Fitness Journey Starts Here</div>
          <h1 className="hero-title-new">
            Build Strength.<br />
            <span className="highlight">Transform Your Life.</span>
          </h1>
          <p className="hero-description-new">
            Professional training equipment, expert-guided workouts, and a community that supports your fitness goals.
          </p>
          <div className="hero-cta-new">
            <Link to="/register" className="btn-primary-new">Start Training</Link>
            <Link to="/login" className="btn-secondary-new">Member Login</Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar-new">
        <div className="container-new">
          <div className="stats-grid-new">
            <div className="stat-item-new">
              <div className="stat-number-new">50+</div>
              <div className="stat-label-new">Workout Routines</div>
            </div>
            <div className="stat-item-new">
              <div className="stat-number-new">24/7</div>
              <div className="stat-label-new">Access</div>
            </div>
            <div className="stat-item-new">
              <div className="stat-number-new">100+</div>
              <div className="stat-label-new">Exercise Library</div>
            </div>
            <div className="stat-item-new">
              <div className="stat-number-new">3</div>
              <div className="stat-label-new">Training Zones</div>
            </div>
          </div>
        </div>
      </section>

      {/* Workouts Section */}
      <section id="workouts" className="workouts-section-new">
        <div className="container-new">
          <div className="section-header-new">
            <h2 className="section-title-new">Training Programs</h2>
            <p className="section-subtitle-new">Comprehensive workout plans for every fitness level</p>
          </div>
          <div className="workouts-grid-new">
            <div className="workout-card-new">
              <div className="workout-icon-new">💪</div>
              <h3 className="workout-title-new">Strength Training</h3>
              <p className="workout-desc-new">Build muscle mass and increase power with structured weightlifting programs.</p>
              <ul className="workout-features-new">
                <li>Progressive overload</li>
                <li>Compound movements</li>
                <li>Recovery protocols</li>
              </ul>
            </div>
            <div className="workout-card-new">
              <div className="workout-icon-new">🏃</div>
              <h3 className="workout-title-new">Cardio & Conditioning</h3>
              <p className="workout-desc-new">Improve endurance and cardiovascular health with high-intensity interval training.</p>
              <ul className="workout-features-new">
                <li>HIIT workouts</li>
                <li>Running programs</li>
                <li>Metabolic conditioning</li>
              </ul>
            </div>
            <div className="workout-card-new">
              <div className="workout-icon-new">🧘</div>
              <h3 className="workout-title-new">Yoga & Flexibility</h3>
              <p className="workout-desc-new">Enhance mobility, reduce stress, and improve balance through mindful movement.</p>
              <ul className="workout-features-new">
                <li>Flow sequences</li>
                <li>Stretching routines</li>
                <li>Breathing techniques</li>
              </ul>
            </div>
            <div className="workout-card-new">
              <div className="workout-icon-new">🔥</div>
              <h3 className="workout-title-new">Functional Fitness</h3>
              <p className="workout-desc-new">Train movements that translate to everyday life and athletic performance.</p>
              <ul className="workout-features-new">
                <li>Bodyweight exercises</li>
                <li>Functional patterns</li>
                <li>Core stability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Yoga Section */}
      <section id="yoga" className="yoga-section-new">
        <div className="container-new">
          <div className="yoga-content-new">
            <div className="yoga-text-new">
              <h2 className="section-title-new">Yoga Practice</h2>
              <p className="yoga-description-new">
                Find balance, flexibility, and inner peace through our comprehensive yoga programs.
                Whether you're a beginner or advanced practitioner, we have sessions designed for your level.
              </p>
              <div className="yoga-benefits-new">
                <div className="benefit-item-new">
                  <span className="benefit-icon-new">✨</span>
                  <span>Stress relief and mental clarity</span>
                </div>
                <div className="benefit-item-new">
                  <span className="benefit-icon-new">🤸</span>
                  <span>Improved flexibility and mobility</span>
                </div>
                <div className="benefit-item-new">
                  <span className="benefit-icon-new">💆</span>
                  <span>Better posture and alignment</span>
                </div>
                <div className="benefit-item-new">
                  <span className="benefit-icon-new">🧘</span>
                  <span>Mindfulness and meditation</span>
                </div>
              </div>
              <Link to="/register" className="btn-primary-new">Explore Yoga Classes</Link>
            </div>
            <div className="yoga-visual-new">
              <div className="yoga-card-grid-new">
                <div className="yoga-card-small-new">Hatha</div>
                <div className="yoga-card-small-new">Vinyasa</div>
                <div className="yoga-card-small-new">Ashtanga</div>
                <div className="yoga-card-small-new">Yin</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="features-section-new">
        <div className="container-new">
          <div className="features-grid-new">
            <div className="feature-item-new">
              <div className="feature-icon-new">📅</div>
              <h3 className="feature-title-new">Workout Tracking</h3>
              <p className="feature-desc-new">Log your exercises, track progress, and monitor your fitness journey</p>
            </div>
            <div className="feature-item-new">
              <div className="feature-icon-new">📊</div>
              <h3 className="feature-title-new">Progress Analytics</h3>
              <p className="feature-desc-new">Visual charts and metrics to see your improvements over time</p>
            </div>
            <div className="feature-item-new">
              <div className="feature-icon-new">🎥</div>
              <h3 className="feature-title-new">Exercise Library</h3>
              <p className="feature-desc-new">Video tutorials and guides for every exercise in our database</p>
            </div>
            <div className="feature-item-new">
              <div className="feature-icon-new">🗓️</div>
              <h3 className="feature-title-new">Workout Calendar</h3>
              <p className="feature-desc-new">Plan and schedule your training sessions in advance</p>
            </div>
            <div className="feature-item-new">
              <div className="feature-icon-new">🛒</div>
              <h3 className="feature-title-new">Fitness Store</h3>
              <p className="feature-desc-new">Access supplements, equipment, and gear from our online store</p>
            </div>
            <div className="feature-item-new">
              <div className="feature-icon-new">💳</div>
              <h3 className="feature-title-new">Membership Plans</h3>
              <p className="feature-desc-new">Flexible membership options to fit your lifestyle and goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-new">
        <div className="container-new">
          <div className="cta-content-new">
            <h2 className="cta-title-new">Ready to Start Your Fitness Journey?</h2>
            <p className="cta-description-new">Join FitHub today and get access to professional training resources</p>
            <div className="cta-buttons-new">
              <Link to="/register" className="btn-primary-new btn-large-new">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-new">
        <div className="container-new">
          <div className="footer-content-new">
            <div className="footer-section-new">
              <h3 className="footer-logo-new">Fit<span>Hub</span></h3>
              <p className="footer-description-new">
                Your complete fitness solution for strength, wellness, and performance.
              </p>
            </div>
          </div>
          <div className="footer-bottom-new">
            <p>© {new Date().getFullYear()} FitHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
