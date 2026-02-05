import React from 'react';
import { useShop } from '../../context/ShopContext';
import './ColorFilter.css';

const ExploreColors = () => {
    const { activeColor, setActiveColor } = useShop();

    const colors = [
        { name: 'Red Party', color: '#ff6b6b' },
        { name: 'Lime Jump', color: '#c0eb75' },
        { name: 'Navy Blue', color: '#339af0' },
        { name: 'Clean White', color: '#ffffff', border: true },
        { name: 'Blue Sky', color: '#74c0fc' },
        { name: 'Purple', color: '#cc5de8' },
        { name: 'Pink', color: '#faa2c1' },
        { name: 'Yellow', color: '#fcc419' },
        { name: 'Dark Green', color: '#40c057' },
    ];

    return (
        <section className="color-section" id="colors">
            <div className="color-header">
                <h2>Explore<br />by Colors</h2>
            </div>
            <div className="color-grid">
                {colors.map((item, index) => (
                    <button
                        key={index}
                        className="color-pill"
                        style={{
                            borderColor: activeColor === item.name ? 'var(--color-primary)' : '#e5e5e5',
                            backgroundColor: activeColor === item.name ? '#f8f9fa' : 'white'
                        }}
                        onClick={() => setActiveColor(activeColor === item.name ? null : item.name)}
                    >
                        <span
                            className="color-dot"
                            style={{
                                backgroundColor: item.color,
                                border: item.border ? '1px solid #e5e5e5' : 'none'
                            }}
                        />
                        <span className="color-name">{item.name}</span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default ExploreColors;
