import React from 'react';
import { Link } from 'react-router-dom';
import '../SubscriptionPage.css';

const SubscriptionPage = () => {
    const plans = [
        {
            id: 1,
            name: 'SILVER',
            price: '199',
            period: '1 Month',
            badge: null,
            features: [
                'Unlimited Video access',
                'Nutritional Guidance',
                'Group trainer',
                'Personalized Plans',
                'Weekly Check-ins'
            ],
            popular: false
        },
        {
            id: 2,
            name: 'GOLD',
            price: '399',
            period: '3 Months',
            badge: 'Most Popular',
            features: [
                'Priority Booking',
                'One time access to Clubs',
                'Discuss fitness goals',
                'Private Community',
                'Renewal Discounts'
            ],
            popular: true
        },
        {
            id: 3,
            name: 'ELITE',
            price: '599',
            period: '6 Months',
            badge: 'Best Value',
            features: [
                'VIP Access',
                'Access to yoga area',
                'Dedicated Support',
                'Custom Rewards',
                'Premium Events'
            ],
            popular: false
        }
    ];

    return (
        <div className="subscription-page">
            <div className="subscription-container">
                <header className="subscription-header">
                    <h1 className="subscription-title">FitPass</h1>
                    <p className="subscription-subtitle">Choose the perfect plan for your fitness journey</p>
                </header>

                <div className="membership-grid">
                    {plans.map((plan) => (
                        <div 
                            key={plan.id} 
                            className={`membership-card ${plan.popular ? 'featured' : ''}`}
                        >
                            {plan.badge && (
                                <div className="membership-badge">{plan.badge}</div>
                            )}
                            <div className="membership-header">
                                <h4 className="membership-tier">{plan.name}</h4>
                                <div className="membership-price-wrapper">
                                    <span className="membership-currency">₹</span>
                                    <span className="membership-price">{plan.price}</span>
                                </div>
                                <p className="membership-period">{plan.period}</p>
                            </div>
                            <div className="membership-features">
                                <ul className="features-list">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="feature-item">
                                            <span className="feature-icon">✓</span>
                                            <span className="feature-text">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link to="/payment" className="membership-button">
                                <span>Get Started</span>
                                <span className="button-arrow">→</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;
