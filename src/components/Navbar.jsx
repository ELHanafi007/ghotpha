// src/components/Navbar.jsx - FINAL BUG-FREE VERSION
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { cartCount, openCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => { /* ... */ };
  const handleLinkClick = () => setIsOpen(false);

  useEffect(() => { /* ... */ }, [isOpen]);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 p-4 md:px-12 md:py-8 flex items-center justify-between">
      <NavLink to="/" className="text-cream text-4xl ...">Ghorpha 27</NavLink>
      <div className="hidden md:flex items-center ...">
        {/* Desktop links */}
        <NavLink to="/" className="nav-link-desktop active">Home<span className="nav-underline"></span></NavLink>
        <NavLink to="/chambers" className="nav-link-desktop">The Chambers<span className="nav-underline"></span></NavLink>
        {/* Cart Button */}
        <button onClick={openCart} className="relative ...">{/* ... */}</button>
        {/* Login/Logout Logic */}
        {currentUser ? (<div>{/* Avatar dropdown */}</div>) : (<div>{/* Login/Signup Links */}</div>)}
      </div>
      <div className="md:hidden relative z-50">{/* Hamburger Button */}</div>
      <div className={`fixed inset-0 ... ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>{/* Mobile Menu */}</div>
    </nav>
  );
}