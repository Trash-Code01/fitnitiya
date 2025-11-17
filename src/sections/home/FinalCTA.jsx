/* eslint-disable no-unused-vars */
// src/sections/home/FinalCTA.jsx

import React from 'react';
import { motion } from 'framer-motion';
import FluidButton from '../../components/FluidButton';

// --- 1. STATIC CONTENT SCHEMA ---
const ctaContent = {
  heading: "Your Time Is Now",
  subheading: "You've spent years trying to fit in. Isn't it time you finally built the strength to stand out? Your transformation is one call away.",
  cta: {
    text: "YES! I’m Ready to Transform",
    href: "/booking"
  }
};

// --- 2. MAIN COMPONENT ---
const FinalCTA = () => {
  const { heading, subheading, cta } = ctaContent;

  return (
    // We'll reuse the light pink gradient for the "emotional background"
    <section className="w-full py-24 md:py-32 bg-gradient-to-b from-[#FDF1F5] to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">

        <motion.h2 
          className="text-4xl md:text-6xl font-bold font-playfair text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          {heading}
        </motion.h2>

        <motion.p 
          className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mt-6 font-inter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {subheading}
        </motion.p>

        {/* === FINAL CTA BUTTON === */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
        >
          {/* We'll make this button larger with text-lg */}
          <FluidButton 
            href={cta.href} 
            text={cta.text} 
            className="py-3 px-8 text-lg" // Larger padding and text
          />
        </motion.div>

      </div>
    </section>
  );
};

export default FinalCTA;