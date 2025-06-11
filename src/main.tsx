// src/main.tsx - Test with just the App component
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // We are adding the main App back

// All our organized stylesheets
import './styles/global.css';
import './styles/navbar.css';
import './styles/homepage.css';
import './styles/components.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);