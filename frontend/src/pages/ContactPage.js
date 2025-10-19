import React, { useState } from 'react';
import axios from 'axios';
import '../ContactPage.css';
import contactBgImage from '../assets/images/bg-contact.jpg';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('Sending...');

        try {
            // --- THIS IS THE CORRECTED LINE ---
            await axios.post('https://fithub-mern-2.onrender.com/api/contact', formData); 
            
            setFormStatus('Message Sent Successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setFormStatus('Error: Could not send message.');
        }
    };

    return (
        <div className="contact-page" style={{ backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url(${contactBgImage})` }}>
            {/* --- THIS IS THE NEW HEADER --- */}
            <div className="page-header">
                <h1>Contact Us</h1>
            </div>
            <div className="contact-container">
                <div className="contact-info">
                    <h2>Get In Touch</h2>
                    <p>Have questions or feedback? We'd love to hear from you. Reach out to us, and let's start a conversation about your fitness goals.</p>
                    <div className="info-item"> <span className="icon">📍</span> <span>Mumbai, Maharashtra, India</span> </div>
                    <div className="info-item"> <span className="icon">✉️</span> <span>shrikrishna.patel04@gmail.com</span> </div>
                    <div className="info-item"> <span className="icon">📞</span> <span>+91 12345 67890</span> </div>
                </div>
                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group"> <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} /> </div>
                        <div className="input-group"> <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} /> </div>
                        <div className="input-group"> <textarea name="message" placeholder="Your Message" required value={formData.message} onChange={handleChange}></textarea> </div>
                        <button type="submit" className="submit-btn" disabled={formStatus === 'Sending...'}> {formStatus === 'Sending...' ? 'Sending...' : 'Send Message'} </button>
                        {formStatus && <p className="form-status">{formStatus}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
