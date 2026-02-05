import React from 'react';
import { useShop } from '../context/ShopContext';

const Inventory = () => {
    const { products, restockItem } = useShop();

    return (
        <div className="admin-page">
            <div className="page-header">
                <h1>Inventory Management</h1>
                <p>Manage stock levels and restock items.</p>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Current Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>
                                <div className="product-cell">
                                    <img src={product.image} alt="" />
                                    <span>{product.title}</span>
                                </div>
                            </td>
                            <td>
                                <span className={`badge ${product.stock === 0 ? 'bg-red' : product.stock < 5 ? 'bg-yellow' : 'bg-green'}`}>
                                    {product.stock === 0 ? 'Out of Stock' : product.stock < 5 ? 'Low Stock' : 'In Stock'}
                                </span>
                            </td>
                            <td>{product.stock}</td>
                            <td>
                                <button className="restock-btn" onClick={() => restockItem(product.id, 10)}>
                                    Restock (+10)
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventory;
