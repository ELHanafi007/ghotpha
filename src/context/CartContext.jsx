// src/context/CartContext.jsx - VERIFIED FINAL VERSION
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        // If item exists, update its quantity
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // If not, add the new product with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Open the cart drawer when an item is added
  };

  const updateQuantity = (productId, amount) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(item => item !== null);
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const value = {
    cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
    cartCount, cartTotal, isCartOpen, openCart, closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};