import React from 'react';
import './Features.css';

const Features = () => {
    const features = [
        {
            icon: '🤍',
            title: 'Take care with love',
            desc: 'We treat every package with full attention and care to ensure you receive your order safe and sound.'
        },
        {
            icon: '📞',
            title: 'Friendly Customer Service',
            desc: 'We provide friendly service anytime to check your order. We will answer whatever your questions are.'
        },
        {
            icon: '🔄',
            title: 'Refund Process',
            desc: 'Returns are fast and easy with our request form and drop off labels. Returns are always free within 30 days.'
        }
    ];

    return (
        <section className="features-section">
            <div className="features-header">
                <h2>Why you'll love to<br />shop on our website</h2>
            </div>
            <div className="features-grid">
                {features.map((feature, index) => (
                    <div key={index} className="feature-item">
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
