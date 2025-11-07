import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../PaymentPage.css';

const PaymentPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardName: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle payment submission
        alert('Payment processing... This is a demo.');
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        setFormData({
            ...formData,
            cardNumber: formatted
        });
    };

    return (
        <div className="payment-page">
            <div className="payment-container">
                <header className="payment-header">
                    <h1 className="payment-title">Secure Checkout</h1>
                    <p className="payment-subtitle">Complete your purchase with confidence</p>
                    <div className="security-badges">
                        <span className="security-badge">🔒 SSL Secured</span>
                        <span className="security-badge">✓ 256-bit Encryption</span>
                        <span className="security-badge">🛡️ Safe & Secure</span>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="payment-form">
                    <div className="form-row">
                        <div className="form-col">
                            <div className="form-section">
                                <h3 className="section-title">
                                    <span className="section-icon">📍</span>
                                    Billing Address
                                </h3>
                                <div className="input-group">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="john.doe@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="address">Street Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="123 Main Street"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="Mumbai"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="state">State</label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            placeholder="Maharashtra"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="zipCode">ZIP Code</label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            placeholder="400001"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-col">
                            <div className="form-section">
                                <h3 className="section-title">
                                    <span className="section-icon">💳</span>
                                    Payment Details
                                </h3>
                                <div className="payment-methods">
                                    <span className="payment-label">Accepted Cards</span>
                                    <div className="card-icons">
                                        <span className="card-icon">💳</span>
                                        <span className="card-icon">💳</span>
                                        <span className="card-icon">💳</span>
                                        <span className="card-icon">💳</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="cardName">Name on Card</label>
                                    <input
                                        type="text"
                                        id="cardName"
                                        name="cardName"
                                        placeholder="JOHN DOE"
                                        value={formData.cardName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="cardNumber">Card Number</label>
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        name="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        value={formData.cardNumber}
                                        onChange={handleCardNumberChange}
                                        maxLength="19"
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="expMonth">Expiry Month</label>
                                    <select
                                        id="expMonth"
                                        name="expMonth"
                                        value={formData.expMonth}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Month</option>
                                        {Array.from({ length: 12 }, (_, i) => {
                                            const month = String(i + 1).padStart(2, '0');
                                            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                            return (
                                                <option key={month} value={month}>
                                                    {month} - {monthNames[i]}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="expYear">Expiry Year</label>
                                        <select
                                            id="expYear"
                                            name="expYear"
                                            value={formData.expYear}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Year</option>
                                            {Array.from({ length: 15 }, (_, i) => {
                                                const year = new Date().getFullYear() + i;
                                                return (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="cvv">CVV</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            name="cvv"
                                            placeholder="123"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            maxLength="4"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <Link to="/ekart" className="back-link">
                            ← Back to Store
                        </Link>
                        <button type="submit" className="submit-button">
                            <span>Proceed to Payment</span>
                            <span className="button-icon">→</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
