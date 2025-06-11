// src/components/FlyingCartItem.jsx
import React, { useState, useEffect } from 'react';

const FlyingCartItem = ({ item }) => {
  const [style, setStyle] = useState({
    position: 'fixed',
    top: `${item.startY}px`,
    left: `${item.startX}px`,
    width: '150px', // Start at a larger size
    height: '150px',
    borderRadius: '8px',
    backgroundImage: `url('${item.imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 9999, // Make sure it's on top of everything
    transition: 'all 0.8s cubic-bezier(0.5, 0, 0.75, 0)', // Easing for a nice arc
    opacity: 1,
    willChange: 'transform, top, left, width, height, opacity',
  });

  useEffect(() => {
    // Trigger the animation shortly after the component mounts
    const timeoutId = setTimeout(() => {
      setStyle(prevStyle => ({
        ...prevStyle,
        top: `${item.endY}px`,
        left: `${item.endX}px`,
        width: '20px',
        height: '20px',
        opacity: 0,
        transform: 'scale(0.2)',
      }));
    }, 10); // A tiny delay to ensure the initial style is applied first

    return () => clearTimeout(timeoutId);
  }, [item]);

  return <div style={style} />;
};

export default FlyingCartItem;