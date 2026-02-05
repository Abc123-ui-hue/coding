import React from 'react';
import Button from '../UI/Button';
import './BlogPreview.css';

const BlogPreview = () => {
    return (
        <section className="blog-section">
            <h2 className="section-title">From The Blog</h2>

            <div className="blog-content">
                <div className="blog-image-wrapper">
                    <img
                        src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2676&auto=format&fit=crop"
                        alt="Clothes Rack"
                        className="blog-image"
                    />
                </div>
                <div className="blog-info">
                    <h3>How to combine your daily outfit to looks fresh and cool.</h3>
                    <p>We provide friendly service anytime to check your order. We will answer whatever your questions are. Also, find matching accessories to enhance your look perfectly.</p>
                    <Button variant="outline">Read More</Button>
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
