import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import './Checkout.css';

const Checkout = () => {
    const { cart, placeOrder } = useShop();
    const navigate = useNavigate();
    // State for managing user input in the checkout form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        card: ''
    });

    // Calculate the total order value by summing up (price * quantity) for all items in cart
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Handle form submission: place the order and redirect to receipt if successful
    const handleSubmit = (e) => {
        e.preventDefault();
        const order = placeOrder(formData);
        if (order) {
            navigate(`/receipt/${order.id}`);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-empty">
                <h2>Your cart is empty</h2>
                <button onClick={() => navigate('/')}>Return to Shop</button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-grid">
                <div className="checkout-form-section">
                    <h2>Checkout</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Shipping Address</label>
                            <input
                                type="text"
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Zip Code</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.zip}
                                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Card Number (Demo)</label>
                            <input
                                type="text"
                                required
                                value={formData.card}
                                onChange={(e) => setFormData({ ...formData, card: e.target.value })}
                                placeholder="0000 0000 0000 0000"
                            />
                        </div>
                        <button type="submit" className="place-order-btn">Place Order - ${total.toFixed(2)}</button>
                    </form>
                </div>

                <div className="order-summary-section">
                    <h3>Order Summary</h3>
                    <div className="summary-items">
                        {cart.map(item => (
                            <div key={item.id} className="summary-item">
                                <img src={item.image} alt={item.title} />
                                <div className="item-info">
                                    <p className="item-title">{item.title}</p>
                                    <p className="item-qty">Qty: {item.quantity}</p>
                                </div>
                                <p className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="summary-total">
                        <div className="total-row">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="total-row">
                            <span>Shipping</span>
                            <span className="free">Free</span>
                        </div>
                        <div className="total-row grand-total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
