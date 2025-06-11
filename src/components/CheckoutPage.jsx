// src/components/CheckoutPage.jsx - FINAL COMPLETE VERSION
import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cartItemsHtml = `
      <table style="width: 100%; border-collapse: collapse; font-family: sans-serif;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Item</th>
            <th style="text-align: center; padding: 8px; border-bottom: 1px solid #ddd;">Qty</th>
            <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${cartItems.map(item => `
            <tr>
              <td style="padding: 8px;">${item.name}</td>
              <td style="text-align: center; padding: 8px;">${item.quantity}</td>
              <td style="text-align: right; padding: 8px;">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    const templateParams = {
      customer_name: formData.fullName,
      customer_phone: formData.phone,
      customer_address: formData.address,
      customer_city: formData.city,
      cart_items: cartItemsHtml,
      cart_total: cartTotal.toFixed(2),
    };

    // Replace with your actual EmailJS keys
    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      templateParams,
      'YOUR_PUBLIC_KEY'
    )
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
       alert("The pact is sealed. Your order has been placed.");
       clearCart();
       navigate('/order-confirmed');
    }, (err) => {
       console.log('FAILED...', err);
       alert("An error occurred while placing the order. Please try again.");
       setIsSubmitting(false);
    });
  };

  return (
    <div className="min-h-screen bg-black text-cream p-4 sm:p-8 pt-28 font-body">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-fancy-title text-center mb-12">Finalize Acquisition</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Side: Shipping Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} className="checkout-input" required />
            <input type="tel" name="phone" placeholder="Phone Number (for confirmation)" value={formData.phone} onChange={handleInputChange} className="checkout-input" required />
            <input type="text" name="address" placeholder="Street Address & Apartment" value={formData.address} onChange={handleInputChange} className="checkout-input" required />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="checkout-input" required />
            <button type="submit" className="checkout-button w-full mt-4" disabled={isSubmitting}>
              {isSubmitting ? 'Sealing the Pact...' : 'Confirm The Pact'}
            </button>
          </form>

          {/* Right Side: Order Summary */}
          <div className="border border-cream/10 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-fancy-title border-b border-cream/10 pb-3 mb-4">Your Curation</h2>
            {cartItems.length > 0 ? cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-cream/60">Quantity: {item.quantity}</p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            )) : <p className="text-sm text-cream/50">Your cart is empty.</p>}
            <div className="flex justify-between items-center text-xl font-bold border-t border-cream/10 pt-3 mt-4">
              <p>Total</p>
              <p>${cartTotal.toFixed(2)}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}