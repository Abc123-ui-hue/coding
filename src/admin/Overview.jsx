import React from 'react';
import { useShop } from '../context/ShopContext';

const Overview = () => {
    const { orders, products } = useShop();

    // Aggregate store metrics from current orders and products
    const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
    const totalSales = orders.length;
    // Calculate total units sold across all orders
    const itemsSold = orders.reduce((acc, o) => acc + o.items.reduce((sum, i) => sum + i.quantity, 0), 0);
    // Identify products that need urgent restocking
    const outOfStock = products.filter(p => p.stock <= 0).length;

    return (
        <div className="admin-page">
            <h1>Dashboard Overview</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-label">Total Revenue</span>
                    <span className="stat-value">${totalRevenue.toFixed(2)}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Total Orders</span>
                    <span className="stat-value">{totalSales}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Items Sold</span>
                    <span className="stat-value">{itemsSold}</span>
                </div>
                <div className="stat-card urgent">
                    <span className="stat-label">Out of Stock</span>
                    <span className="stat-value">{outOfStock}</span>
                </div>
            </div>

            <div className="recent-activity">
                <h3>Low Stock Alert</h3>
                <div className="low-stock-list">
                    {products.filter(p => p.stock < 5).map(p => (
                        <div key={p.id} className="low-stock-item">
                            <span>{p.title}</span>
                            <span className={`stock-status ${p.stock === 0 ? 'zero' : 'low'}`}>
                                {p.stock === 0 ? 'RESTOCK NOW' : `${p.stock} left`}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Overview;
