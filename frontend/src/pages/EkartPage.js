import React from 'react';
import { Link } from 'react-router-dom';
import '../EkartPage.css';
// --- THIS IS THE GUARANTEED FIX (STEP 1) ---
// We import the image directly into the JavaScript file.
// Please make sure your file is named 'bg-ekart.jpg' in 'src/assets/images'.
import ekartBgImage from '../assets/images/bg-ekart.jpg';

const shreePatelProducts = [
  { id: 1, title: "Whey Protein", price: "₹2500", img: "/images/wp.jpg", desc: "The highest quality whey isolate for rapid muscle recovery and growth. Perfect post-workout." },
  { id: 2, title: "Creatine", price: "₹1000", img: "/images/creat.jpg", desc: "Pure micronized creatine monohydrate to boost strength, power, and athletic performance." },
  { id: 3, title: "BCAA", price: "₹1200", img: "/images/bcaa.jpg", desc: "Essential amino acids to reduce muscle soreness, prevent breakdown, and improve endurance." },
  { id: 4, title: "Pre Workout", price: "₹1500", img: "/images/pre.jpg", desc: "An explosive blend of energy, focus, and pump ingredients to dominate your training session." },
  { id: 5, title: "Multivitamins", price: "₹900", img: "/images/multi.jpg", desc: "A complete spectrum of essential vitamins and minerals to support overall health and wellness." },
];

const EkartPage = () => {
    return (
        // --- THIS IS THE GUARANTEED FIX (STEP 2) ---
        // We apply the imported image using an inline style.
        <div className="feature-ekart-page" style={{ backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.96), rgba(10, 10, 10, 0.96)), url(${ekartBgImage})` }}>
            <header className="ekart-header">
                <h1>Our Arsenal</h1>
                <p>Engineered for performance, designed for champions. Discover the fuel for your journey.</p>
            </header>

            {shreePatelProducts.map((patelProduct) => (
                <section key={patelProduct.id} className="product-showcase">
                    <div className="showcase-image">
                        <img src={patelProduct.img} alt={patelProduct.title} />
                    </div>
                    <div className="showcase-details">
                        <h2>{patelProduct.title}</h2>
                        <p className="price">{patelProduct.price}</p>
                        <p className="desc">{patelProduct.desc}</p>
                        <Link to="/payment" className="buy-button">Buy Now</Link>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default EkartPage;