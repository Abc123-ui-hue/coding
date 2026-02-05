import React from 'react';
import { useShop } from '../context/ShopContext';

const Orders = () => {
    const { orders } = useShop();

    return (
        <div className="admin-page">
            <h1>Order History</h1>

            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer.name}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>${order.total.toFixed(2)}</td>
                                <td><span className="badge bg-green">{order.status}</span></td>
                                <td>
                                    <button
                                        className="restock-btn"
                                        style={{ background: '#333' }}
                                        onClick={() => window.open(`/receipt/${order.id}`, '_blank')}
                                    >
                                        Produce Receipt
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Orders;
