import { createContext, useState, useEffect } from 'react';
import { products } from '../lib/data';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < products.length + 100; i++) { // Safely cover potential future IDs or just iterate products
        // Better approach: iterate over known product IDs
        cart[i] = 0;
    }
    // Ideally, use actual product IDs from the imported list
    products.forEach(product => {
        cart[product.id] = 0;
    });
    return cart;
};

export const ShopContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cart');
        const parsedCart = JSON.parse(saved);

        // Always generate a fresh default cart to ensure all current products exist
        const defaultCart = getDefaultCart();

        if (parsedCart) {
            // Merge saved counts into default cart
            // This ensures new products (keys) exist with 0, and old products keep their count
            return { ...defaultCart, ...parsedCart };
        }
        return defaultCart;
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, (prev[itemId] || 0) - 1) }));
    };

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += cartItems[item] * itemInfo.price;
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            totalItems += cartItems[item];
        }
        return totalItems;
    }

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getTotalCartAmount,
        getTotalCartItems,
        products
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};
