// src/components/OrderConfirmedPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderConfirmedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-black text-cream p-8">
      <h1 className="text-5xl md:text-7xl font-fancy-title mb-6">The Pact is Sealed.</h1>
      <p className="text-xl text-cream/80 max-w-2xl mb-10">
        Your acquisition is being prepared. We will contact you by phone shortly to confirm the details. The transformation has begun.
      </p>
      <Link to="/fragrances" className="inline-block px-8 py-3 bg-blood-red text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-80 transition transform hover:scale-105">
        Return to the Archive
      </Link>
    </div>
  );
}