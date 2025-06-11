// src/components/QuizResultsPage.jsx - FINAL VERSION WITH FALLBACK
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { products } from '../data/products.js';
import ProductCard from './ProductCard.jsx';
import { motion } from 'framer-motion';

export default function QuizResultsPage() {
  const location = useLocation();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false); // State to know if we're showing fallback results

  useEffect(() => {
    const userTags = location.state?.tags || [];
    let topRecommendations = [];

    if (userTags.length > 0) {
      const scoredProducts = products.map(product => {
        let matchScore = 0;
        userTags.forEach(tag => {
          if (product.tags.includes(tag)) { matchScore++; }
        });
        return { ...product, matchScore };
      });

      scoredProducts.sort((a, b) => b.matchScore - a.matchScore);

      // Only take recommendations that have a score of at least 1
      topRecommendations = scoredProducts.filter(p => p.matchScore > 0).slice(0, 4);
    }

    // --- THIS IS THE NEW FALLBACK LOGIC ---
    // If no strong matches were found, recommend the first 3 products as a default
    if (topRecommendations.length === 0) {
      topRecommendations = products.slice(0, 3);
      setIsFallback(true); // Set a flag so we can show a slightly different message
    }

    // Simulate a delay for a dramatic "calculating" effect
    setTimeout(() => {
      setRecommendations(topRecommendations);
      setIsLoading(false);
    }, 2000);

  }, [location.state]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-cream flex flex-col items-center justify-center p-4 font-fancy-title">
        <p className="text-3xl animate-pulse">Consulting the Oracle...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-cream p-8 pt-28 font-body">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-fancy-title text-cream mb-4">
          {isFallback ? "A General Divination" : "The Oracle's Recommendation"}
        </h1>
        <p className="text-lg text-cream/70">
          {isFallback 
            ? "While your path was unique, these essences are universally admired." 
            : "Based on your path, these essences have called out to you."
          }
        </p>
      </header>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>

      <div className="text-center mt-16">
        <Link to="/discovery-quiz" className="filter-button active-filter">Take the Inquiry Again</Link>
      </div>
    </div>
  );
}