import React from 'react';
import '../PaymentPage.css'; // Import the new CSS

const PaymentPage = () => {
    return (
        <div className="payment-page">
            <div className="payment-container">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="row">
                        <div className="col">
                            <h3 className="title">billing address</h3>
                            <div className="inputBox">
                                <span>full name :</span>
                                <input type="text" placeholder="Shrikrishna Patel" />
                            </div>
                            <div className="inputBox">
                                <span>email :</span>
                                <input type="email" placeholder="example@gmail.com" />
                            </div>
                            <div className="inputBox">
                                <span>address :</span>
                                <input type="text" placeholder="Vellore Institute of Tech." />
                            </div>
                            <div className="inputBox">
                                <span>city :</span>
                                <input type="text" placeholder="Bhopal" />
                            </div>
                            <div className="flex">
                                <div className="inputBox">
                                    <span>state :</span>
                                    <input type="text" placeholder="India" />
                                </div>
                                <div className="inputBox">
                                    <span>zip code :</span>
                                    <input type="text" placeholder="123 456" />
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <h3 className="title">payment</h3>
                            <div className="inputBox">
                                <span>cards accepted :</span>
                                <img src="https://i.imgur.com/gsvFvgF.png" alt="cards" />
                            </div>
                            <div className="inputBox">
                                <span>name on card :</span>
                                <input type="text" placeholder="Mr. Shrikrishna Patel" />
                            </div>
                            <div className="inputBox">
                                <span>credit card number :</span>
                                <input type="number" placeholder="1111-2222-3333-4444" />
                            </div>
                            <div className="inputBox">
                                <span>exp month :</span>
                                <input type="text" placeholder="January" />
                            </div>
                            <div className="flex">
                                <div className="inputBox">
                                    <span>exp year :</span>
                                    <input type="number" placeholder="2025" />
                                </div>
                                <div className="inputBox">
                                    <span>CVV :</span>
                                    <input type="text" placeholder="123" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="proceed to checkout" className="submit-btn" />
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;