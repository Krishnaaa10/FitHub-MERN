import React from 'react';
import '../AboutPage.css';

const AboutPage = () => {
    const values = [
        {
            icon: '💪',
            title: 'Commitment',
            description: 'We are dedicated to helping you achieve your fitness goals with unwavering support and guidance.'
        },
        {
            icon: '🌟',
            title: 'Excellence',
            description: 'We strive for excellence in everything we do, from our content to our community support.'
        },
        {
            icon: '🤝',
            title: 'Community',
            description: 'Building a supportive community where everyone can thrive and achieve their best selves.'
        },
        {
            icon: '🎯',
            title: 'Results',
            description: 'Focused on delivering real, measurable results through proven methods and expert guidance.'
        }
    ];

    return (
        <div className="about-page">
            <div className="about-container">
                <header className="about-header-section">
                    <h1 className="about-title">About FitHub</h1>
                    <p className="about-subtitle">Your ultimate fitness destination, built with passion for transformation</p>
                </header>

                <section className="mission-section">
                    <div className="mission-content">
                        <div className="mission-icon">🎯</div>
                        <h2 className="section-title">Our Mission</h2>
                        <p className="mission-text">
                            At FitHub, our mission is to revolutionize the fitness experience by blending innovation, knowledge, and community. 
                            We strive to make health and wellness accessible and inspiring, empowering individuals to stay consistent and 
                            committed to their goals. We believe that everyone deserves access to quality fitness resources and a supportive 
                            community that pushes them to be their best.
                        </p>
                    </div>
                </section>

                <section className="founder-section">
                    <div className="founder-content">
                        <div className="founder-image-wrapper">
                            <div className="founder-placeholder">👤</div>
                        </div>
                        <div className="founder-info">
                            <h2 className="section-title">Meet the Founder</h2>
                            <h3 className="founder-name">Shrikrishna Patel</h3>
                            <p className="founder-bio">
                                FitHub was founded by <strong>Shrikrishna Patel</strong>, a fitness enthusiast with a vision to make 
                                high-quality exercise guidance and resources accessible to everyone. From a simple idea to a comprehensive 
                                platform, Shrikrishna's dedication is the driving force behind our commitment to your health and wellness journey.
                            </p>
                            <div className="founder-quote">
                                <p>"Fitness is not about being better than someone else. It's about being better than you used to be."</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="values-section">
                    <h2 className="section-title">Our Core Values</h2>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card">
                                <div className="value-icon">{value.icon}</div>
                                <h3 className="value-title">{value.title}</h3>
                                <p className="value-description">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
