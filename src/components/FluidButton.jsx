/* eslint-disable no-unused-vars */
// src/components/FluidButton.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A reusable fluid-animation button that expands from the mouse position.
 * Default state: Transparent background, black border, black text.
 * Hover state: Black background (from blob), white text.
 */
const FluidButton = ({ href, text, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // --- Animation Variants ---
  const textVariants = {
    rest: {
      color: '#000000', // Default: black text
    },
    hover: {
      color: '#ffffff', // On hover: white text
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const blobVariants = {
    rest: {
      scale: 0,
    },
    hover: {
      scale: 15, // Scale up to cover the button
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <Link to={href}>
      <motion.div
        className={`relative inline-block overflow-hidden bg-transparent 
                    border-2 border-black rounded-full cursor-pointer 
                    py-2 px-6 ${className}`} // Transparent, black border
        initial="rest"
        whileHover="hover"
        animate={isHovered ? 'hover' : 'rest'}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 1. The Fluid Background (The "Blob") */}
        <motion.div
          className="absolute z-0 bg-black rounded-full"
          style={{
            x: springX,
            y: springY,
            width: 15,
            height: 15,
            translateX: '-50%',
            translateY: '-50%',
          }}
          variants={blobVariants}
        />

        {/* 2. The Text (Stays on top) */}
        <motion.span
          className="relative z-10 block font-semibold"
          variants={textVariants}
        >
          {text}
        </motion.span>
      </motion.div>
    </Link>
  );
};

export default FluidButton;