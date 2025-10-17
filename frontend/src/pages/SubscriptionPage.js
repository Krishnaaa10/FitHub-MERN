import React from 'react';
import { Link } from 'react-router-dom';
import '../SubscriptionPage.css'; // Import the new CSS

const SubscriptionPage = () => {
    return (
        <div className="subscription-page">
            <h1 className="subscription-header">FitPass</h1>
            <div className="membership-grid">
                {/* SILVER CARD */}
                <div className="membership-card">
                    <h4>SILVER</h4>
                    <h2><sup>₹</sup>199</h2>
                    <h3>For 1 Month</h3>
                    <p>Unlimited Video access</p>
                    <p>Nutritional Guidance</p>
                    <p>Group trainer</p>
                    <p>Personalized Plans</p>
                    <p>Weekly Check-ins</p>
                    <button className="btn membership-btn">
                        <Link to="/payment">GET STARTED</Link>
                    </button>
                </div>
                {/* GOLD CARD */}
                <div className="membership-card">
                    <h4>GOLD</h4>
                    <h2><sup>₹</sup>399</h2>
                    <h3>For 3 Months</h3>
                    <p>Priority Booking</p>
                    <p>One time access to Clubs</p>
                    <p>Discuss fitness goals</p>
                    <p>Private Community</p>
                    <p>Renewal Discounts</p>
                    <button className="btn membership-btn">
                        <Link to="/payment">GET STARTED</Link>
                    </button>
                </div>
                {/* ELITE CARD */}
                <div className="membership-card">
                    <h4>ELITE</h4>
                    <h2><sup>₹</sup>599</h2>
                    <h3>For 6 Months</h3>
                    <p>VIP Access</p>
                    <p>Access to yoga area</p>
                    <p>Dedicated Support</p>
                    <p>Custom Rewards</p>
                    <p>Premium Events</p>
                    <button className="btn membership-btn">
                        <Link to="/payment">GET STARTED</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;