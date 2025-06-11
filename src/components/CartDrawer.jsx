// src/components/CartDrawer.jsx - THE ALCHEMIST'S SATCHEL
import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, cartTotal, updateQuantity } = useCart();
  const navigate = useNavigate();

  // This function handles the checkout button click
  const handleCheckout = () => {
    closeCart(); // Close the drawer first
    navigate('/checkout'); // Then navigate to the checkout page
  };

  // Animation variants for the list to make items cascade in
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    },
  };

  // Animation variants for each individual item in the cart
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[90]"
          />

          {/* The Drawer Panel Itself */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="cart-drawer-panel" // This class is styled in your master index.css
          >
            <header className="p-6 flex justify-between items-center border-b border-cream/10 flex-shrink-0">
              <h2 className="text-2xl font-fancy-title text-cream">Your Curation</h2>
              <button onClick={closeCart} className="text-cream/50 hover:text-cream transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </header>

            {/* Cart Items List */}
            <motion.div 
              className="flex-grow p-6 overflow-y-auto space-y-5"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <motion.div key={item.id} className="cart-item-card" variants={itemVariants}>
                    <img src={item.imageUrl} alt={item.name} className="cart-item-image"/>
                    <div className="flex-grow">
                      <p className="font-semibold text-base text-cream">{item.name}</p>
                      <p className="text-sm text-cream/60">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => updateQuantity(item.id, -1)} className="quantity-button">-</button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="quantity-button">+</button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center text-cream/50 mt-10 h-full flex flex-col justify-center items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  <p className="text-2xl font-fancy-title">An Empty Vessel</p>
                  <p className="font-body-light">Your curation awaits its first essence.</p>
                </div>
              )}
            </motion.div>

            {/* Footer with Checkout Button */}
            {cartItems.length > 0 && (
              <footer className="p-6 border-t border-cream/10 bg-black/30 flex-shrink-0">
                <div className="flex justify-between items-center text-lg mb-4">
                  <span className="text-cream/70">Subtotal</span>
                  <span className="font-semibold text-cream text-2xl font-fancy-title">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-center text-cream/40 mb-4">
                  Your transformation is moments away...
                </p>
                <button onClick={handleCheckout} className="checkout-button">
                  Proceed to Acquisition
                </button>
              </footer>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}