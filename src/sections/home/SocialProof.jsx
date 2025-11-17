/* eslint-disable no-unused-vars */
// src/sections/home/SocialProof.jsx

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. STATIC CONTENT SCHEMA ---
const socialProofContent = {
  sliderHeading: "Real Women, Real Transformations",
  sliderSubheading: "This is what happens when you commit to the system. Real results from women just like you.",
  
  transformation: {
    name: "Priya S.",
    before: {
      stats: "BEFORE: 30kg",
      quote: "I never thought I could look like this. I felt weak and had no confidence.",
      // New 800x500 rectangular image
      img: "https://res.cloudinary.com/dafgtt9l7/image/upload/v1763349544/freepik__the-style-is-candid-image-photography-with-natural__92358_oipmnv.png"
    },
    after: {
      stats: "AFTER: 33.2kg",
      quote: "I gained 3.2kg in 28 days and feel stronger than I ever imagined.",
      // New 800x500 rectangular image
      img: "https://res.cloudinary.com/dafgtt9l7/image/upload/v1763349545/freepik__the-style-is-candid-image-photography-with-natural__92359_xthrxr.png"
    }
  },
};

// --- 2. SUB-COMPONENT: Custom Before/After Slider ---
const CustomImageSlider = React.forwardRef(({ 
  beforeImg, 
  afterImg, 
  sliderPos,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onMouseMove,
  onTouchStart,
  onTouchEnd,
  onTouchMove
}, ref) => {
  return (
    <div
      ref={ref}
      className="relative w-full max-w-[700px] h-[350px] md:h-[450px] rounded-lg overflow-hidden cursor-e-resize select-none"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      {/* Before Image (Base Layer) */}
      <img
        src={beforeImg}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* After Image (Clipped Layer) */}
      <div
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
        }}
      >
        <img
          src={afterImg}
          alt="After"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-8 rounded-full bg-white shadow-md border-2 border-gray-300 flex items-center justify-center">
          <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
        </div>
      </div>
    </div>
  );
});
CustomImageSlider.displayName = "CustomImageSlider";

// --- 3. MAIN COMPONENT (Now "Smart") ---
const SocialProof = () => {
  const { sliderHeading, sliderSubheading, transformation } = socialProofContent;

  const [sliderPos, setSliderPos] = useState(0); // Start at 0
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const handleMove = (clientX) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => handleMove(e.clientX);
  
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

  const isBefore = sliderPos <= 50; 
  const activeText = isBefore ? transformation.before : transformation.after;

  return (
    <section className="w-full py-24 md:py-32 bg-white">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-black">{sliderHeading}</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-6 font-inter">{sliderSubheading}</p>
        </div>

        {/* --- Centered Slider --- */}
        <div className="flex justify-center">
          <CustomImageSlider
            ref={sliderRef}
            beforeImg={transformation.before.img}
            afterImg={transformation.after.img}
            sliderPos={sliderPos}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          />
        </div>

        {/* --- DYNAMIC TEXT (Below Slider) --- */}
        <div className="relative w-full max-w-xl mx-auto mt-12 h-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={isBefore ? "before" : "after"} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <h3 className={`text-lg font-semibold text-center font-inter ${
                isBefore ? 'text-gray-500' : 'text-pink-500'
              }`}>
                {activeText.stats}
              </h3>
              <p className="text-xl md:text-2xl text-center text-black font-medium italic mt-2">
                "{activeText.quote}"
              </p>
              <p className="text-xl text-center font-bold text-black mt-6">
                - {transformation.name}
              </p>
            </motion.div> 
          </AnimatePresence>
        </div>
      </div>
      
    </section>
  );
};

export default SocialProof;