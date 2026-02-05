import React from 'react';
import { useShop } from '../../context/ShopContext';
import ProductCard from './ProductCard';
import './Trending.css';

const Trending = () => {
    const {
        products,
        activeCategory, setActiveCategory,
        activeColor, setActiveColor,
        searchQuery
    } = useShop();

    const filteredProducts = products.filter(product => {
        const matchesSearch = !searchQuery ||
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());

        // If searching, ignore other filters to show all matches
        if (searchQuery) return matchesSearch;

        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesColor = !activeColor || product.color === activeColor;
        return matchesCategory && matchesColor;
    });

    const handleFilterClick = (filter) => {
        setActiveCategory(filter);
    };

    return (
        <section className="trending-section" id="trending">
            <div className="section-header">
                <h2 onClick={() => { setActiveCategory('All'); setActiveColor(null); setSearchQuery(''); }} style={{ cursor: 'pointer' }}>
                    Trending {activeColor && <span style={{ fontSize: '0.6em', color: 'var(--color-primary)' }}>• {activeColor}</span>}
                    {searchQuery && <span style={{ fontSize: '0.6em', color: 'var(--color-primary)' }}>• Searching for "{searchQuery}"</span>}
                </h2>
                <div className="filters">
                    {['All', 'Men', 'Women', 'Kids'].map(filter => (
                        <button
                            key={filter}
                            className={activeCategory === filter ? 'active' : ''}
                            onClick={() => handleFilterClick(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>
            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))
                ) : (
                    <div className="no-products">
                        <p>No products found for this search.</p>
                        <button onClick={() => { setActiveCategory('All'); setActiveColor(null); setSearchQuery(''); }} className="btn-link">Clear All Filters & Search</button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Trending;
