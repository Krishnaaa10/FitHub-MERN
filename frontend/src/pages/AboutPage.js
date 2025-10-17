import React from 'react';
import { Link } from 'react-router-dom';
import '../AboutPage.css';
// --- STEP 1: Import the image directly into the component ---
// IMPORTANT: Please check your `src/assets/images` folder. If your file is named `bg-about.jpeg`,
// you MUST change the line below to `import aboutBgImage from '../assets/images/bg-about.jpeg';`
import aboutBgImage from '../assets/images/bg-about.jpg';

const AboutPage = () => {
    return (
        // --- STEP 2: Apply the image using an inline style ---
        <div className="about-page" style={{ backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.92), rgba(10, 10, 10, 0.92)), url(${aboutBgImage})` }}>
            <div className="about-container">
                <h1 className="about-header">About Fithub</h1>
                <p className="about-subheader">Your ultimate fitness oasis, built by a passion for transformation.</p>

                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        At FitHub, our mission is to revolutionize the fitness experience by blending innovation, knowledge, and community. We strive to make health and wellness accessible and inspiring, empowering individuals to stay consistent and committed to their goals.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Meet the Founder</h2>
                    <p>
                        Fithub was founded by <strong>Shrikrishna Patel</strong>, a fitness enthusiast with a vision to make high-quality exercise guidance and resources accessible to everyone. From a simple idea to a comprehensive platform, Shrikrishna's dedication is the driving force behind our commitment to your health.
                    </p>
                </div>
                
                <Link to="/home" className="back-home-link">Back to Home</Link>
            </div>
        </div>
    );
};

export default AboutPage;