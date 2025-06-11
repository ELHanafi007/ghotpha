// In src/App.tsx, replace the entire HomePage function with this.

// Make sure these imports are at the TOP of your App.tsx file:
// import { Link } from 'react-router-dom';
// import { useScroll, useTransform, motion } from 'framer-motion';
// import React, { useRef } from 'react';

function HomePage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // --- ANIMATION LOGIC ---
  const monolithScale = useTransform(scrollYProgress, [0, 0.1], [1, 15]);
  const monolithOpacity = useTransform(scrollYProgress, [0.1, 0.12], [1, 0]);

  // The red conduit line animations
  const line1PathLength = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const line2PathLength = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);

  // Product glimpse animations
  const showcase1Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, 1, 0]);
  const showcase2Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const showcase3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]);

  const finalCtaOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  return (
    <div ref={targetRef} className="homepage-v4" style={{ position: 'relative' }}>

      {/* STAGE 1: THE MONOLITH */}
      <section className="monolith-container">
        <motion.div className="monolith-v4" style={{ scale: monolithScale, opacity: monolithOpacity }}>
          <div className="monolith-glow-v4"></div>
          <h1 className="monolith-title-v4">Ghorpha 27</h1>
        </motion.div>
      </section>

      {/* This container holds the rest of the journey */}
      <div className="journey-content-v4">

        {/* STAGE 2: THE CONDUITS & SHOWCASE */}
        <section className="showcase-container-v4">
          {/* The animated red lines */}
          <svg className="conduit-svg" viewBox="0 0 1000 2000" preserveAspectRatio="none">
            <motion.path d="M 500,0 L 500,600 L 200,900 L 800,1200 L 500,1500 L 500,2000" style={{ pathLength: line1PathLength }}/>
            <motion.path d="M 0,1000 L 1000,1000" style={{ pathLength: line2PathLength }}/>
          </svg>

          {/* The product glimpses that fade in and out */}
          <div className="showcase-item one">
            <motion.img style={{ opacity: showcase1Opacity }} src="/showcase/watch.jpg" alt="Luxury Watch"/>
            <div className="showcase-label">The Alchemist's Timepiece</div>
          </div>
          <div className="showcase-item two">
            <motion.img style={{ opacity: showcase2Opacity }} src="/showcase/clothing.jpg" alt="High Fashion"/>
            <div className="showcase-label">The Defiant Silhouette</div>
          </div>
          <div className="showcase-item three">
            <motion.img style={{ opacity: showcase3Opacity }} src="/showcase/fragrance.jpg" alt="Signature Fragrance"/>
            <div className="showcase-label">The Lingering Echo</div>
          </div>
        </section>

        {/* STAGE 3: THE FINAL INVITATION */}
        <motion.section className="final-invitation" style={{ opacity: finalCtaOpacity }}>
          <h2 className="reveal-title">The Alchemy Begins</h2>
          <div className="reveal-buttons">
            <Link to="/discovery-quiz" className="reveal-button">
              <span>Discover Your Essence</span>
              <small>Take the Inquiry</small>
            </Link>
            <Link to="/fragrances" className="reveal-button">
              <span>Explore the Archive</span>
              <small>View the Collection</small>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}