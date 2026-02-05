import React from 'react';
import Button from '../UI/Button';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-structure">

            {/* Top Bento Grid - 3 Items */}
            <div className="hero-bento">
                {/* Main Item (Left) */}
                <div className="bento-item main-item" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2670&auto=format&fit=crop)' }}>
                    <div className="bento-content">
                        <h1>Color of<br />Summer<br />Outfit</h1>
                        <p>Style that combines perfect and unique casual in this summer.</p>
                        <Button variant="primary" onClick={() => document.getElementById('trending').scrollIntoView({ behavior: 'smooth' })}>
                            View Collection
                        </Button>
                    </div>
                </div>

                {/* Right Column Stack */}
                <div className="bento-stack">
                    {/* Top Right */}
                    <div className="bento-item sub-item" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2670&auto=format&fit=crop)' }}>
                        <div className="bento-content dark-bg">
                            <h2>Outdoor<br />Active</h2>
                        </div>
                    </div>
                    {/* Bottom Right */}
                    <div className="bento-item sub-item" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=2670&auto=format&fit=crop)' }}>
                        <div className="bento-content">
                            <h2>Casual<br />Comfort</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Casual Inspirations Section (Below Hero Grid) */}
            <div className="inspirations-bento">
                <div className="inspiration-header">
                    <h2>Casual<br />Inspirations</h2>
                    <p>Curated combinations for casual style that works regardless of your active lifestyle.</p>
                    <Button variant="outline" onClick={() => document.getElementById('colors').scrollIntoView({ behavior: 'smooth' })}>
                        Browse Collections
                    </Button>
                </div>

                <div className="bento-item square-item" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670&auto=format&fit=crop)' }}>
                    <div className="bento-overlay">
                        <h3>Say it<br />with Shirt ↗</h3>
                    </div>
                </div>

                <div className="bento-item square-item" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2670&auto=format&fit=crop)' }}>
                    <div className="bento-overlay">
                        <h3>Funky never<br />get old ↗</h3>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Hero;
