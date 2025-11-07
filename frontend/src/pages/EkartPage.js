import React from 'react';
import { Link } from 'react-router-dom';
import '../EkartPage.css';

const shreePatelProducts = [
  { id: 1, title: "Whey Protein", price: "₹2,500", img: "/images/wp.jpg", desc: "The highest quality whey isolate for rapid muscle recovery and growth. Perfect post-workout.", badge: "Best Seller", category: "Protein" },
  { id: 2, title: "Creatine", price: "₹1,000", img: "/images/creat.jpg", desc: "Pure micronized creatine monohydrate to boost strength, power, and athletic performance.", badge: "Popular", category: "Performance" },
  { id: 3, title: "BCAA", price: "₹1,200", img: "/images/bcaa.jpg", desc: "Essential amino acids to reduce muscle soreness, prevent breakdown, and improve endurance.", badge: "New", category: "Recovery" },
  { id: 4, title: "Pre Workout", price: "₹1,500", img: "/images/pre.jpg", desc: "An explosive blend of energy, focus, and pump ingredients to dominate your training session.", badge: "Hot", category: "Energy" },
  { id: 5, title: "Multivitamins", price: "₹900", img: "/images/multi.jpg", desc: "A complete spectrum of essential vitamins and minerals to support overall health and wellness.", badge: "Essential", category: "Health" },
  { id: 6, title: "Glutamine", price: "₹1,100", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop&q=80", desc: "Essential amino acid for muscle recovery, immune support, and reducing exercise-induced fatigue.", badge: "Recovery", category: "Recovery" },
  { id: 7, title: "Protein Shaker", price: "₹600", img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&h=400&fit=crop&q=80", desc: "Premium quality shaker bottle with mixing ball for perfect protein shakes on the go.", badge: "Accessory", category: "Equipment" },
  { id: 8, title: "Protein Bars", price: "₹800", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop&q=80", desc: "High-protein, low-sugar bars perfect for on-the-go nutrition and post-workout recovery.", badge: "Snack", category: "Nutrition" },
];

const EkartPage = () => {
    return (
        <div className="ekart-page">
            <div className="ekart-container">
                <header className="ekart-header">
                    <div className="ekart-header-content">
                        <h1 className="ekart-title">Fitness Store</h1>
                        <p className="ekart-subtitle">Premium supplements, equipment & gear engineered for champions</p>
                        <div className="ekart-badges">
                            <span className="ekart-badge">🔥 Premium Quality</span>
                            <span className="ekart-badge">⚡ Fast Delivery</span>
                            <span className="ekart-badge">💰 Best Prices</span>
                        </div>
                    </div>
                </header>

                {/* Promotional Banner */}
                <section className="promo-banner">
                    <div className="promo-content">
                        <div className="promo-icon">🎉</div>
                        <div className="promo-text">
                            <h3>Special Offer</h3>
                            <p>Get 15% off on orders above ₹5,000. Use code: <strong>FITHUB15</strong></p>
                        </div>
                    </div>
                </section>

                {/* Product Categories */}
                <section className="categories-section">
                    <h2 className="section-title">Shop by Category</h2>
                    <div className="categories-grid">
                        <div className="category-card">
                            <div className="category-icon">💪</div>
                            <h3>Protein</h3>
                            <p>Muscle building & recovery</p>
                        </div>
                        <div className="category-card">
                            <div className="category-icon">⚡</div>
                            <h3>Performance</h3>
                            <p>Strength & power boosters</p>
                        </div>
                        <div className="category-card">
                            <div className="category-icon">🔄</div>
                            <h3>Recovery</h3>
                            <p>Faster muscle repair</p>
                        </div>
                        <div className="category-card">
                            <div className="category-icon">🔥</div>
                            <h3>Energy</h3>
                            <p>Pre-workout & focus</p>
                        </div>
                        <div className="category-card">
                            <div className="category-icon">🌿</div>
                            <h3>Health</h3>
                            <p>Vitamins & wellness</p>
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="products-section">
                    <div className="section-header">
                        <h2 className="section-title">Featured Products</h2>
                        <p className="section-subtitle">Curated selection of premium supplements for your fitness journey</p>
                    </div>
                    <div className="products-grid">
                        {shreePatelProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                {product.badge && (
                                    <div className="product-badge">{product.badge}</div>
                                )}
                                <div className="product-image-wrapper">
                                    <img src={product.img} alt={product.title} className="product-image" />
                                    <div className="product-overlay"></div>
                                </div>
                                <div className="product-content">
                                    <div className="product-category">{product.category}</div>
                                    <h3 className="product-title">{product.title}</h3>
                                    <p className="product-description">{product.desc}</p>
                                    <div className="product-footer">
                                        <div className="product-price">{product.price}</div>
                                        <Link to="/payment" className="product-button">
                                            <span>Buy Now</span>
                                            <span className="button-arrow">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Shop With Us */}
                <section className="why-shop-section">
                    <h2 className="section-title">Why Shop With Us?</h2>
                    <div className="why-shop-grid">
                        <div className="why-shop-card">
                            <div className="why-shop-icon">✓</div>
                            <h3>Authentic Products</h3>
                            <p>100% genuine supplements from trusted brands</p>
                        </div>
                        <div className="why-shop-card">
                            <div className="why-shop-icon">🚚</div>
                            <h3>Fast Shipping</h3>
                            <p>Quick delivery across India with secure packaging</p>
                        </div>
                        <div className="why-shop-card">
                            <div className="why-shop-icon">💬</div>
                            <h3>Expert Support</h3>
                            <p>Get guidance from certified nutritionists</p>
                        </div>
                        <div className="why-shop-card">
                            <div className="why-shop-icon">↩️</div>
                            <h3>Easy Returns</h3>
                            <p>30-day return policy on all products</p>
                        </div>
                    </div>
                </section>

                {/* Customer Reviews */}
                <section className="reviews-section">
                    <h2 className="section-title">What Our Customers Say</h2>
                    <div className="reviews-grid">
                        <div className="review-card">
                            <div className="review-rating">★★★★★</div>
                            <p className="review-text">"Amazing quality products! The whey protein helped me achieve my fitness goals faster. Highly recommended!"</p>
                            <div className="review-author">- Rajesh K.</div>
                        </div>
                        <div className="review-card">
                            <div className="review-rating">★★★★★</div>
                            <p className="review-text">"Fast delivery and authentic products. The pre-workout gives me incredible energy for my sessions!"</p>
                            <div className="review-author">- Priya S.</div>
                        </div>
                        <div className="review-card">
                            <div className="review-rating">★★★★★</div>
                            <p className="review-text">"Best prices and excellent customer service. My go-to store for all fitness supplements!"</p>
                            <div className="review-author">- Amit M.</div>
                        </div>
                    </div>
                </section>

                {/* Coming Soon */}
                <section className="coming-soon-section">
                    <div className="coming-soon-content">
                        <div className="coming-soon-icon">🔔</div>
                        <h3>More Products Coming Soon!</h3>
                        <p>We're constantly expanding our inventory. Stay tuned for new arrivals including protein bars, shakers, and more!</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EkartPage;
