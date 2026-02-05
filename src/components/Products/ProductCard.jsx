import React from 'react';
import { useShop } from '../../context/ShopContext';
import './ProductCard.css';

const ProductCard = ({ id, image, title, price, category, stock }) => {
    const { addToCart, toggleWishlist, wishlist } = useShop();

    const isWishlisted = wishlist.some(item => item.id === id);
    const isOutOfStock = stock <= 0;

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (isOutOfStock) return;
        addToCart({ id, image, title, price, category });
    };

    return (
        <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
            <div className="card-image-wrapper">
                <img src={image} alt={title} className="card-image" />
                {isOutOfStock && <div className="sold-out-badge">SOLD OUT</div>}
                <button
                    className={`favorite-btn ${isWishlisted ? 'active' : ''}`}
                    aria-label="Add to favorites"
                    onClick={(e) => { e.stopPropagation(); toggleWishlist({ id, image, title, price }); }}
                >
                    {isWishlisted ? '♥' : '♡'}
                </button>
                {!isOutOfStock && (
                    <button className="add-to-cart-overlay" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                )}
            </div>
            <div className="card-info">
                <div className="card-meta">
                    <span className="stock-count">{isOutOfStock ? 'Out of Stock' : `${stock} in stock`}</span>
                </div>
                <h3 className="card-title">{title}</h3>
                <p className="card-price">${price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
