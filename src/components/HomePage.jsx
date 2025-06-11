// src/components/HomePage.jsx - FINAL BUG-FREE VERSION
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'; // CORRECTED IMPORT
import { useScroll, ScrollControls, VideoTexture, Html } from '@react-three/drei';
import { motion, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// Helper function to calculate opacity based on scroll range
function getOpacity(scrollOffset, range) {
  if (scrollOffset < range[0] || scrollOffset > range[3]) return 0;
  if (scrollOffset >= range[1] && scrollOffset <= range[2]) return 1;
  
  if (scrollOffset < range[1]) {
    return (scrollOffset - range[0]) / (range[1] - range[0]);
  } else {
    return (range[3] - scrollOffset) / (range[3] - range[2]);
  }
}

// This is the component for a single video plane, now using useFrame
function VideoPlane({ url, position, scale, scrollRange }) {
  const materialRef = useRef();
  const scrollData = useScroll();

  // useFrame runs on every single animation frame
  useFrame(() => {
    // Calculate the opacity based on the current scroll offset
    const opacity = getOpacity(scrollData.scroll.current, scrollRange);
    if (materialRef.current) {
      materialRef.current.opacity = opacity;
    }
  });

  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial ref={materialRef} transparent toneMapped={false}>
        <VideoTexture src={url} muted loop />
      </meshBasicMaterial>
    </mesh>
  );
}

// This helper for the final UI now correctly uses the <Html> component
function FinalInvitation({ scrollRange }) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, scrollRange, [0, 1]);

  return (
    <Html center style={{ pointerEvents: 'none' }}>
      <motion.div style={{ opacity, pointerEvents: 'all' }} className="final-invitation-v2">
        <h2 className="reveal-title">The Alchemy Begins</h2>
        <div className="reveal-buttons">
          <Link to="/discovery-quiz" className="reveal-button"><span>Discover Your Essence</span></Link>
          <Link to="/fragrances" className="reveal-button"><span>Explore the Archive</span></Link>
        </div>
      </motion.div>
    </Html>
  );
}

// This is the main export for the homepage
export default function HomePage() {
  return (
    <div className="homepage-v5">
      <Canvas>
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.2}>
            <VideoPlane url="/videos/smoke.mp4" position={[-1.5, 0, 0]} scale={[3, 5]} scrollRange={[0.01, 0.1, 0.2, 0.25]} />
            <VideoPlane url="/videos/watch.mp4" position={[1.5, -4.5, -1]} scale={[3, 5]} scrollRange={[0.25, 0.3, 0.45, 0.5]} />
            <VideoPlane url="/videos/fabric.mp4" position={[-1, -9, -2]} scale={[4, 5]} scrollRange={[0.5, 0.55, 0.7, 0.75]} />
            <FinalInvitation scrollRange={[0.9, 1]}/>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}