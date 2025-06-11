// src/components/ConstellationPage.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ConstellationPage() {
  const constraintsRef = useRef(null);

  const stars = [
    { id: 1, title: 'The Archive', subtitle: 'Explore the Essences', link: '/fragrances', x: '20%', y: '30%' },
    { id: 2, title: 'The Oracle', subtitle: 'Discover Your Scent', link: '/discovery-quiz', x: '70%', y: '25%' },
    { id: 3, title: 'The Chambers', subtitle: 'Enter the Threshold', link: '/chambers', x: '45%', y: '65%' },
  ];

  return (
    <div className="constellation-viewport" ref={constraintsRef}>
      <motion.div 
        className="constellation-canvas" 
        drag 
        dragConstraints={constraintsRef}
        dragTransition={{ bounceStiffness: 50, bounceDamping: 20 }}
      >
        <svg className="constellation-lines" preserveAspectRatio="xMidYMid slice">
          <line x1="20%" y1="30%" x2="70%" y2="25%" />
          <line x1="70%" y1="25%" x2="45%" y2="65%" />
          <line x1="45%" y1="65%" x2="20%" y2="30%" />
        </svg>

        {stars.map(star => (
          <motion.div 
            key={star.id} 
            className="constellation-star-wrapper"
            style={{ top: star.y, left: star.x }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: star.id * 0.3 }}
          >
            <Link to={star.link} className="constellation-star group">
              <div className="star-core"></div>
              <div className="star-label">
                <span className="star-title">{star.title}</span>
                <span className="star-subtitle">{star.subtitle}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <div className="constellation-hint">
        Click and drag to explore the void.
      </div>
    </div>
  );
}