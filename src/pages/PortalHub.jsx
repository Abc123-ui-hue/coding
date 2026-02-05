import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import './PortalHub.css';

const PortalHub = () => {
    const { orders, products } = useShop();

    const outOfStock = products.filter(p => p.stock <= 0).length;
    const recentOrders = orders.length;

    return (
        <div className="portal-hub-container">
            <div className="portal-header">
                <h1>Management Portal</h1>
                <p>Control your inventory, track sales, and manage orders in one place.</p>
            </div>

            <div className="portal-options">
                <Link to="/admin" className="portal-card">
                    <div className="portal-card-icon">📊</div>
                    <h3>Admin Overview</h3>
                    <p>View sales performance and revenue metrics.</p>
                    <span className="portal-card-meta">{recentOrders} orders placed</span>
                </Link>

                <Link to="/admin/inventory" className="portal-card">
                    <div className="portal-card-icon">📦</div>
                    <h3>Inventory Management</h3>
                    <p>Monitor stock, restock items, and manage products.</p>
                    {outOfStock > 0 && <span className="portal-card-badge danger">{outOfStock} Out of Stock</span>}
                </Link>

                <Link to="/admin/orders" className="portal-card">
                    <div className="portal-card-icon">📜</div>
                    <h3>Order Tracking</h3>
                    <p>Review and manage customer order history.</p>
                    <span className="portal-card-meta">Full history available</span>
                </Link>
            </div>

            <div className="portal-footer">
                <Link to="/" className="btn-link">← Return to Storefront</Link>
            </div>
        </div>
    );
};

export default PortalHub;
