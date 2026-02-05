import React from 'react';
import { useShop } from '../../context/ShopContext';
import './CartItem.css';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useShop();

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-img" />
            <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p className="cart-item-price">${item.price}</p>
                <div className="cart-controls">
                    <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
