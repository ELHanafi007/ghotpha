// src/components/ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="group relative aspect-[3/4] border border-cream/10 rounded-xl overflow-hidden transition-all duration-500 hover:border-cream/40 hover:shadow-2xl hover:shadow-black">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-100 brightness-50"
        style={{ backgroundImage: `url(${product.imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      <div className="relative flex flex-col justify-end h-full p-6 text-left">
        <h3 className="text-2xl font-fancy-title text-cream mb-2 transition-transform duration-500 ease-out group-hover:-translate-y-20">{product.name}</h3>
        <div className="opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 space-y-3">
          <p className="text-cream/80 font-body-light text-sm h-12">
            {product.description}
          </p>
          <p className="font-semibold text-lg text-cream">${product.price}</p>
          <button onClick={handleViewDetails} className="px-5 py-2 bg-blood-red/80 backdrop-blur-sm border border-blood-red text-white text-sm font-semibold rounded-lg hover:bg-blood-red transition-colors duration-300">
            Unveil Secret
          </button>
        </div>
      </div>
    </div>
  );
}