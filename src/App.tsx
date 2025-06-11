// src/App.tsx - FINAL MASTER VERSION
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import './styles/global.css'; // Main global styles
import './styles/homepage.css'; // Styles for the new homepage
import './styles/navbar.css'; // Styles for the Navbar
import './styles/components.css'; // Styles for all other components

// --- CORE & PAGE COMPONENTS ---
import Navbar from './components/Navbar.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import ChambersPage from './components/ChambersPage.jsx';
import FragrancesPage from './components/FragrancesPage.jsx';
import ProductDetailPage from './components/ProductDetailPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import QuizPage from './components/QuizPage.jsx';
import QuizResultsPage from './components/QuizResultsPage.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import OrderConfirmedPage from './components/OrderConfirmedPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import LoginPage from './components/LoginPage.jsx';

// The new, monolithic homepage is now defined directly here.


function HomePage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // --- ANIMATION LOGIC ---
  const monolithScale = useTransform(scrollYProgress, [0, 0.1], [1, 15]);
  const monolithOpacity = useTransform(scrollYProgress, [0.1, 0.12], [1, 0]);

  // --- Red Conduit Line Animations ---
  const line1PathLength = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const line2PathLength = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);

  // --- Product Glimpse Animations ---
  const showcase1Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, 1, 0]);
  const showcase2Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const showcase3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]);

  // --- Final CTA Animation ---
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
          <motion.div className="showcase-item one" style={{ opacity: showcase1Opacity }}>
            <img src="/showcase/watch.jpg" alt="Luxury Watch"/>
            <div className="showcase-label">The Alchemist's Timepiece</div>
          </motion.div>
          <motion.div className="showcase-item two" style={{ opacity: showcase2Opacity }}>
            <img src="/showcase/clothing.jpg" alt="High Fashion"/>
            <div className="showcase-label">The Defiant Silhouette</div>
          </motion.div>
          <motion.div className="showcase-item three" style={{ opacity: showcase3Opacity }}>
            <img src="/showcase/fragrance.jpg" alt="Signature Fragrance"/>
            <div className="showcase-label">The Lingering Echo</div>
          </motion.div>
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

function AnimatedRoutes() {
  const location = useLocation();
  const pageVariants = { initial: { opacity: 0 }, in: { opacity: 1 }, out: { opacity: 0 } };
  const pageTransition = { duration: 0.5 };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chambers" element={<motion.div {...{variants: pageVariants, transition: pageTransition, initial: "initial", animate: "in", exit: "out"}}><ChambersPage /></motion.div>} />
        <Route path="/fragrances" element={<motion.div {...{variants: pageVariants, transition: pageTransition, initial: "initial", animate: "in", exit: "out"}}><FragrancesPage /></motion.div>} />
        <Route path="/product/:productId" element={<motion.div {...{variants: pageVariants, transition: pageTransition, initial: "initial", animate: "in", exit: "out"}}><ProductDetailPage /></motion.div>} />
        <Route path="/discovery-quiz" element={<motion.div {...{variants: pageVariants, transition: pageTransition, initial: "initial", animate: "in", exit: "out"}}><QuizPage /></motion.div>} />
        <Route path="/quiz-results" element={<motion.div {...{variants: pageVariants, transition: pageTransition, initial: "initial", animate: "in", exit: "out"}}><QuizResultsPage /></motion.div>} />
        <Route path="/checkout" element={<motion.div {...{variants: pageVariants, transition: pageTransition, initial: "initial", animate: "in", exit: "out"}}><CheckoutPage /></motion.div>} />
        <Route path="/order-confirmed" element={<motion.div {...{variants: pageVariants, transition: pageTransition, initial: "initial", animate: "in", exit: "out"}}><OrderConfirmedPage /></motion.div>} />
        <Route path="/signup" element={<motion.div {...{variants: pageVariants, transition: pageTransition, initial: "initial", animate: "in", exit: "out"}}><SignUpPage /></motion.div>} />
        <Route path="/login" element={<motion.div {...{variants: pageVariants, transition: pageTransition, initial: "initial", animate: "in", exit: "out"}}><LoginPage /></motion.div>} />
        <Route path="*" element={<motion.div {...{variants: pageVariants, transition: pageTransition, initial: "initial", animate: "in", exit: "out"}}><NotFoundPage /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <header className="app-navbar">
          <Navbar />
        </header>
        <CartDrawer />
        <main className="app-content">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}
export default App;