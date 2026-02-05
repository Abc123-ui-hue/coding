import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import Hero from './components/Hero/Hero';
import Trending from './components/Products/Trending';
import ExploreColors from './components/Sections/ExploreColors';
import Testimonial from './components/Sections/Testimonial';
import Features from './components/Sections/Features';
import BlogPreview from './components/Sections/BlogPreview';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Drawer from './components/UI/Drawer';
import CartItem from './components/UI/CartItem';
import Toast from './components/UI/Toast';

// Pages
import Checkout from './pages/Checkout';
import Receipt from './pages/Receipt';
import PortalHub from './pages/PortalHub';
import AdminDashboard from './admin/Dashboard';

const StoreFront = () => (
  <main>
    <Hero />
    <Trending />
    <ExploreColors />
    <Testimonial />
    <Features />
    <BlogPreview />
  </main>
);

const AppContent = () => {
  const {
    isCartOpen, setIsCartOpen, cart,
    isWishlistOpen, setIsWishlistOpen, wishlist
  } = useShop();

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <Router>
      <div className="app-container">
        <Header />
        <Toast />

        {/* Cart Drawer */}
        <Drawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} title="Shopping Cart">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map(item => <CartItem key={item.id} item={item} />)}
              <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 600 }}>
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block' }} onClick={() => setIsCartOpen(false)}>
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </Drawer>

        {/* Wishlist Drawer */}
        <Drawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} title="My Wishlist">
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            wishlist.map(item => <CartItem key={item.id} item={{ ...item, quantity: 1 }} />)
          )}
        </Drawer>

        <Routes>
          <Route path="/" element={<StoreFront />} />
          <Route path="/portal" element={<PortalHub />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/receipt/:orderId" element={<Receipt />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;
