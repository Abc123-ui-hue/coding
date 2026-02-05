import React, { createContext, useState, useContext, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

const INITIAL_PRODUCTS = [
    {
        id: 1,
        title: 'Casual Shoe',
        price: 125,
        category: 'Men',
        color: 'Clean White',
        stock: 10,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Skateboard Shoe',
        price: 125,
        category: 'Men',
        color: 'Navy Blue',
        stock: 5,
        image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2612&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Running Shoe',
        price: 135,
        category: 'Women',
        color: 'Purple',
        stock: 8,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2612&auto=format&fit=crop'
    },
    {
        id: 4,
        title: 'Summer Sneaker',
        price: 110,
        category: 'Kids',
        color: 'Pink',
        stock: 12,
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2574&auto=format&fit=crop'
    },
    {
        id: 5,
        title: 'Basket Shoe',
        price: 145,
        category: 'Men',
        color: 'Yellow',
        stock: 3,
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2670&auto=format&fit=crop'
    },
    {
        id: 6,
        title: 'Sportwear Shoe',
        price: 120,
        category: 'Women',
        color: 'Red Party',
        stock: 0,
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=2598&auto=format&fit=crop'
    }
];

export const ShopProvider = ({ children }) => {
    // Global State management
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [orders, setOrders] = useState([]);

    // UI state (modals, toasts, filters)
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeColor, setActiveColor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const resetFilters = () => {
        setActiveCategory('All');
        setActiveColor(null);
        setSearchQuery('');
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Logic for adding items to cart with stock validation
    const addToCart = (product) => {
        const p = products.find(i => i.id === product.id);
        if (!p || p.stock <= 0) {
            showToast('Item is out of stock', 'error');
            return;
        }

        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                // Check if user tries to exceed available inventory
                if (existing.quantity >= p.stock) {
                    showToast('Cannot add more than available stock', 'error');
                    return prev;
                }
                showToast(`Increased quantity of ${product.title}`);
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            showToast(`Added ${product.title} to Cart`);
            setIsCartOpen(true);
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        const p = products.find(i => i.id === id);
        setCart((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty = Math.max(0, item.quantity + delta);
                    if (newQty > p.stock) {
                        showToast('Insufficient stock', 'error');
                        return item;
                    }
                    return { ...item, quantity: newQty };
                }
                return item;
            }).filter((item) => item.quantity > 0)
        );
    };

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                showToast(`Removed ${product.title} from Wishlist`);
                return prev.filter((item) => item.id !== product.id);
            }
            showToast(`Added ${product.title} to Wishlist`);
            return [...prev, product];
        });
    };

    // Finalize the transaction, update inventory, and clear cart
    const placeOrder = (customerData) => {
        if (cart.length === 0) return null;

        const newOrder = {
            id: `ORD-${Date.now()}`,
            items: [...cart],
            total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
            customer: customerData,
            date: new Date().toISOString(),
            status: 'Paid'
        };

        // Decrement stock based on purchase quantity
        setProducts(prev => prev.map(p => {
            const cartItem = cart.find(ci => ci.id === p.id);
            if (cartItem) {
                return { ...p, stock: p.stock - cartItem.quantity };
            }
            return p;
        }));

        setOrders(prev => [newOrder, ...prev]);
        setCart([]);
        showToast('Order placed successfully!', 'success');
        return newOrder;
    };

    const restockItem = (id, amount) => {
        setProducts(prev => prev.map(p =>
            p.id === id ? { ...p, stock: p.stock + amount } : p
        ));
        showToast(`Restocked item #${id}`);
    };

    const value = {
        products,
        cart,
        wishlist,
        orders,
        isCartOpen, setIsCartOpen,
        isWishlistOpen, setIsWishlistOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        placeOrder,
        restockItem,
        toast,
        activeCategory, setActiveCategory,
        activeColor, setActiveColor,
        searchQuery, setSearchQuery,
        resetFilters
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
