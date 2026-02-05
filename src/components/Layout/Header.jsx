import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const {
        setIsCartOpen, cart,
        setIsWishlistOpen, wishlist,
        searchQuery, setSearchQuery,
        showToast
    } = useShop();

    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (isSearchExpanded && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchExpanded]);

    const triggerSearch = () => {
        if (searchQuery.trim()) {
            const resultsSection = document.getElementById('trending');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            showToast(`Searching for "${searchQuery}"...`);
        }
    };

    const handleSearchClick = (e) => {
        if (e) e.preventDefault();
        if (!isSearchExpanded) {
            setIsSearchExpanded(true);
        } else if (!searchQuery) {
            setIsSearchExpanded(false);
        } else {
            triggerSearch();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            triggerSearch();
        }
    };

    return (
        <header className="header">
            <div className="logo-wrapper" onClick={() => navigate('/')}>
                <div className="logo-icon">V</div>
                <div className="logo-text">VANTAGE</div>
            </div>

            <div className={`search-container ${isSearchExpanded ? 'expanded' : ''}`}>
                <button aria-label="Search" onClick={handleSearchClick}>🔍</button>
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {searchQuery && (
                    <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
                )}
            </div>

            <nav className="nav-links">
                <Link to="/">Home</Link>
                <a href="#trending">Categories</a>
                <Link to="/portal">Portal</Link>
                <Link to="/admin" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Admin</Link>
            </nav>
            <div className="header-actions">
                <button aria-label="Wishlist" onClick={() => setIsWishlistOpen(true)} className="icon-btn">
                    ♡
                    {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
                </button>
                <button aria-label="Cart" onClick={() => setIsCartOpen(true)} className="icon-btn">
                    🛒
                    {cart.length > 0 && <span className="badge">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
                </button>
            </div>
        </header>
    );
};

export default Header;
