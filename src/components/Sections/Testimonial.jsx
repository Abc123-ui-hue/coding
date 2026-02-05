import React from 'react';
import './Testimonial.css';

const Testimonial = () => {
    return (
        <section className="testimonial-section">
            <div className="testimonial-content">
                <span className="subtitle">What people said</span>
                <h2>Love the way they<br />handle the order.</h2>
                <p className="quote">"Very professional and friendly at the same time. They guided me with sizing and fit for my items which was greatly appreciated. Quality of my new wardrobe is amazing, will definitely recommend for online purchase."</p>
                <div className="author">
                    <strong>Samantha William</strong>
                    <span>Fashion Enthusiast</span>
                </div>
            </div>
            <div className="testimonial-image-wrapper">
                <img
                    src="https://images.unsplash.com/photo-1595956553066-fe24a8c33395?q=80&w=2574&auto=format&fit=crop"
                    alt="Customer"
                    className="testimonial-image"
                />
            </div>
        </section>
    );
};

export default Testimonial;
