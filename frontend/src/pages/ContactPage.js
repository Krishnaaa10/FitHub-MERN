import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import '../ContactPage.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        subject: '',
        message: '' 
    });
    const [formStatus, setFormStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus('Sending...');

        try {
            await api.post('/contact', formData);
            setFormStatus('Message sent successfully! We\'ll get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setFormStatus('Error: Could not send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactMethods = [
        {
            icon: '📍',
            title: 'Address',
            info: 'Mumbai, Maharashtra, India',
            detail: '123 Fitness Street, Health City'
        },
        {
            icon: '✉️',
            title: 'Email',
            info: 'shrikrishna.patel04@gmail.com',
            detail: 'We respond within 24 hours'
        },
        {
            icon: '📞',
            title: 'Phone',
            info: '+91 12345 67890',
            detail: 'Mon-Sat, 9AM - 6PM IST'
        },
        {
            icon: '💬',
            title: 'Support',
            info: 'Available 24/7',
            detail: 'Chat with us anytime'
        }
    ];

    return (
        <div className="contact-page">
            <div className="contact-container">
                <header className="contact-header">
                    <h1 className="contact-title">Get In Touch</h1>
                    <p className="contact-subtitle">Have questions or feedback? We'd love to hear from you. Reach out and let's start a conversation about your fitness goals.</p>
                </header>

                <div className="contact-content">
                    <div className="contact-info-section">
                        <h2 className="info-section-title">Contact Information</h2>
                        <p className="info-section-text">Choose your preferred way to reach us. We're here to help you on your fitness journey.</p>
                        
                        <div className="contact-methods">
                            {contactMethods.map((method, index) => (
                                <div key={index} className="contact-method-card">
                                    <div className="method-icon">{method.icon}</div>
                                    <div className="method-content">
                                        <h3 className="method-title">{method.title}</h3>
                                        <p className="method-info">{method.info}</p>
                                        <p className="method-detail">{method.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="social-links">
                            <h3 className="social-title">Follow Us</h3>
                            <div className="social-icons">
                                <a href="#" className="social-link" aria-label="Facebook">📘</a>
                                <a href="#" className="social-link" aria-label="Instagram">📷</a>
                                <a href="#" className="social-link" aria-label="Twitter">🐦</a>
                                <a href="#" className="social-link" aria-label="YouTube">📺</a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-section">
                        <h2 className="form-section-title">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="your.email@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="What's this about?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell us how we can help you..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    required
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <span className="button-icon">→</span>
                                    </>
                                )}
                            </button>
                            {formStatus && (
                                <div className={`form-status ${formStatus.includes('Error') ? 'error' : 'success'}`}>
                                    {formStatus}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
