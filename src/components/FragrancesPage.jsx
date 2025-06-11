// src/components/FragrancesPage.jsx - CLEANED UP (NO VIP POPUP)
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products.js';
import ProductCard from './ProductCard.jsx';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// --- Helper logic to get min/max prices & unique brands/profiles from our data ---
const allPrices = products.map(p => p.price);
const minPrice = Math.min(...allPrices);
const maxPrice = Math.max(...allPrices);
const allBrands = [...new Set(products.map(p => p.brand))];
const allProfiles = [...new Set(products.map(p => p.profile))];

export default function FragrancesPage() {
  // --- ALL OUR FILTER STATES ---
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceValues, setPriceValues] = useState([minPrice, maxPrice]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // --- HANDLER FUNCTIONS FOR FILTERS ---
  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };
  const handleProfileToggle = (profile) => {
    setSelectedProfiles(prev => prev.includes(profile) ? prev.filter(p => p !== profile) : [...prev, profile]);
  };

  // --- THE MASTER FILTERING LOGIC ---
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => activeCategory === 'all' || p.category === activeCategory)
      .filter(p => selectedBrands.length === 0 || selectedBrands.includes(p.brand))
      .filter(p => p.price >= priceValues[0] && p.price <= priceValues[1])
      .filter(p => selectedProfiles.length === 0 || selectedProfiles.includes(p.profile));
  }, [activeCategory, selectedBrands, priceValues, selectedProfiles]);

  return (
    <div className="min-h-screen bg-black text-cream p-4 sm:p-8 pt-28 font-body">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-fancy-title text-cream mb-4 drop-shadow-[0_0_15px_rgba(178,34,34,0.5)]">
          The Fragrance Room
        </h1>
        <p className="text-lg text-cream/60 font-body-light">An archive of scents that defy time.</p>
      </header>

      <div className="max-w-3xl mx-auto text-center mb-16 p-6 bg-gray-900/50 border border-cream/10 rounded-xl">
        <h2 className="text-2xl font-fancy-title text-cream mb-2">Unsure Where to Begin?</h2>
        <p className="text-cream/70 mb-4">Let the Oracle guide your intuition.</p>
        <Link to="/discovery-quiz" className="inline-block px-8 py-3 bg-blood-red text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-80 transition transform hover:scale-105">
          Begin the Inquiry
        </Link>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-4 md:gap-8 mb-6">
        <button onClick={() => setActiveCategory('all')} className={`filter-button ${activeCategory === 'all' ? 'active-filter' : ''}`}>All</button>
        <button onClick={() => setActiveCategory('men')} className={`filter-button ${activeCategory === 'men' ? 'active-filter' : ''}`}>Men</button>
        <button onClick={() => setActiveCategory('women')} className={`filter-button ${activeCategory === 'women' ? 'active-filter' : ''}`}>Women</button>
        <button onClick={() => setActiveCategory('unisex')} className={`filter-button ${activeCategory === 'unisex' ? 'active-filter' : ''}`}>Unisex</button>
        <button onClick={() => setShowAdvanced(!showAdvanced)} className="filter-button ml-4 !border-cream/20">
          {showAdvanced ? 'Hide Filters' : 'Advanced Filters'}
        </button>
      </div>

      {showAdvanced && (
        <div className="max-w-4xl mx-auto space-y-8 mb-16 p-6 border border-cream/10 rounded-lg">
          {/* All the advanced filters (Brand, Profile, Price) go here */}
          <div>
            <h3 className="text-cream/60 mb-3 text-sm tracking-widest uppercase text-center">Brand</h3>
            <div className="flex justify-center items-center flex-wrap gap-3 md:gap-4">
              {allBrands.map(brand => (<button key={brand} onClick={() => handleBrandToggle(brand)} className={`brand-filter-button ${selectedBrands.includes(brand) ? 'active-brand-filter' : ''}`}>{brand}</button>))}
            </div>
          </div>
          <div>
            <h3 className="text-cream/60 mb-3 text-sm tracking-widest uppercase text-center">Profile</h3>
            <div className="flex justify-center items-center flex-wrap gap-3 md:gap-4">
              {allProfiles.map(profile => (<button key={profile} onClick={() => handleProfileToggle(profile)} className={`brand-filter-button capitalize ${selectedProfiles.includes(profile) ? 'active-brand-filter' : ''}`}>{profile}</button>))}
            </div>
          </div>
          <div>
            <h3 className="text-cream/60 mb-3 text-sm tracking-widest uppercase text-center">Price Range</h3>
            <div className="px-4">
              <Slider range min={minPrice} max={maxPrice} defaultValue={[minPrice, maxPrice]} onChangeComplete={(values) => setPriceValues(values)} className="price-slider" />
              <div className="flex justify-between text-xs text-cream/50 mt-2">
                <span>{priceValues[0]} MAD</span>
                <span>{priceValues[1]} MAD</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => ( <ProductCard key={product.id} product={product} /> ))
        ) : (
          <div className="col-span-full text-center text-cream/50 py-16">
            <p className="text-2xl font-fancy-title">No matching essence found in the archive.</p>
          </div>
        )}
      </div>
    </div>
  );
}