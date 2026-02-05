import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-brand">
                    <div className="logo-text">VANTAGE</div>
                    <p>Elevate your stride with the ultimate in premium casual footwear.</p>
                </div>
                <div className="footer-links">
                    <h4>Shop</h4>
                    <Link to="/">Men</Link>
                    <Link to="/">Women</Link>
                    <Link to="/">Kids</Link>
                </div>
                <div className="footer-links">
                    <h4>Company</h4>
                    <a href="#">About Us</a>
                    <a href="#">Contact</a>
                    <Link to="/admin">Admin Portal</Link>
                </div>
                <div className="footer-links">
                    <h4>Support</h4>
                    <a href="#">Shipping</a>
                    <a href="#">Returns</a>
                    <a href="#">FAQ</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 VANTAGE PREMIUM FOOTWEAR. ALL RIGHTS RESERVED.</p>
            </div>
        </footer>
    );
};

export default Footer;
