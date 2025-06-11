// src/main.tsx - FINAL CORRECTED IMPORTS
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// 👇 These are the ONLY CSS imports you should have 👇
import './styles/global.css';
import './styles/navbar.css';
import './styles/homepage.css';
import './styles/components.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);