import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import './Receipt.css';

const Receipt = () => {
    const { orderId } = useParams();
    const { orders } = useShop();
    const navigate = useNavigate();

    const order = orders.find(o => o.id === orderId);

    if (!order) {
        return <div className="receipt-error">Order not found</div>;
    }

    return (
        <div className="receipt-container">
            <div className="receipt-card">
                <div className="receipt-header">
                    <div className="brand-header">
                        <div className="logo-text">VANTAGE</div>
                        <p className="brand-tagline">Premium Footwear Collective</p>
                    </div>
                    <div className="success-icon">✓</div>
                    <h2>Order Successful!</h2>
                    <p>Thank you for your purchase, {order.customer.name.split(' ')[0]}.</p>
                </div>

                <div className="receipt-details">
                    <div className="detail-row">
                        <span>Order Number:</span>
                        <span className="value">{order.id}</span>
                    </div>
                    <div className="detail-row">
                        <span>Date:</span>
                        <span className="value">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-row">
                        <span>Payment Status:</span>
                        <span className="value status-paid">{order.status}</span>
                    </div>
                </div>

                <div className="receipt-items">
                    <h3>Items Ordered</h3>
                    {order.items.map(item => (
                        <div key={item.id} className="receipt-item">
                            <span className="item-name">{item.title} x {item.quantity}</span>
                            <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="receipt-total">
                    <div className="total-row">
                        <span>Total Paid</span>
                        <span className="grand-total">${order.total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="receipt-actions">
                    <button className="print-btn" onClick={() => window.print()}>Print Receipt</button>
                    <button className="home-btn" onClick={() => navigate('/')}>Continue Shopping</button>
                </div>

                <div className="shipping-info">
                    <h3>Shipping to</h3>
                    <p>{order.customer.name}</p>
                    <p>{order.customer.address}</p>
                    <p>{order.customer.city}, {order.customer.zip}</p>
                </div>
            </div>
        </div>
    );
};

export default Receipt;
