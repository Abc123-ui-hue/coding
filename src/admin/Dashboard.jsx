import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import Inventory from './Inventory';
import Orders from './Orders';
import Overview from './Overview';
import './Admin.css';

const AdminDashboard = () => {
    const location = useLocation();

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="admin-logo">ADMIN PORTAL</div>
                <nav className="admin-nav">
                    <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Overview</Link>
                    <Link to="/admin/inventory" className={location.pathname === '/admin/inventory' ? 'active' : ''}>Inventory</Link>
                    <Link to="/admin/orders" className={location.pathname === '/admin/orders' ? 'active' : ''}>Orders</Link>
                </nav>
                <Link to="/" className="back-to-shop">← Back to Shop</Link>
            </aside>

            <main className="admin-main">
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminDashboard;
