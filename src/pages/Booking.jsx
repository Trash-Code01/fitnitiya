/* eslint-disable no-unused-vars */


import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { InlineWidget } from 'react-calendly'; // <-- Import the widget

// --- 1. STATIC CONTENT SCHEMA ---
const bookingContent = {
  heading: [
    "Book Your",
    "Free 1:1 Call"
  ],
  subheading: "This is the first step. A 15-minute, no-pressure chat to see if we're a good fit. Let's talk about your goals and build a plan.",
  calendlyUrl: "YOUR_CALENDLY_URL_HERE" // <-- IMPORTANT: Replace this!
  // e.g., "https://calendly.com/your-username/15min"
};

// --- 2. SCROLL REVEAL TEXT SUB-COMPONENT ---
// (We'll use this for the heading)
const ScrollRevealText = ({ textContent, activeIndex, className = "" }) => {
  let wordIndex = 0;
  return (
    <div>
      {textContent.map((line, lineIndex) => (
        <div key={lineIndex} className={`mb-2 ${className}`}>
          {line.split(' ').map((word, index) => {
            const currentWordIndex = wordIndex++;
            const isActive = currentWordIndex <= activeIndex;
            return (
              <span
                key={index}
                className={`word inline-block mr-4 font-bold font-playfair transition-colors duration-300 ease-in-out ${
                  isActive ? 'text-black' : 'text-gray-200'
                }`}
                style={{ lineHeight: '1.1' }}
              >
                {word}
              </span>
            );
          })}
        </div>
      ))}
      <style jsx>{`
        .word { font-size: 72px; }
        @media (max-width: 768px) { .word { font-size: 56px; } }
        @media (max-width: 480px) { .word { font-size: 44px; } }
      `}</style>
    </div>
  );
};

// --- 3. MAIN BOOKING PAGE COMPONENT ---
const Booking = () => {
  const { heading, subheading, calendlyUrl } = bookingContent;

  const [activeIndex, setActiveIndex] = useState(-1);
  const totalWords = useMemo(() => heading.join(' ').split(' ').length, [heading]);
  
  // Start animation on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex(totalWords - 1);
    }, 500); // Start animation after 500ms
    return () => clearTimeout(timer);
  }, [totalWords]);

  return (
    <main>
      <section className="w-full py-32 md:py-40 bg-gradient-to-b from-white to-[#FDF1F5]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* === HEADER === */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ScrollRevealText textContent={heading} activeIndex={activeIndex} className="text-center" />
            <motion.p
              className="text-lg text-gray-700 font-inter mt-6 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {subheading}
            </motion.p>
          </motion.div>

          {/* === CALENDLY EMBED === */}
          <motion.div 
            className="w-full mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8 }}
          >
            {calendlyUrl === "YOUR_CALENDLY_URL_HERE" ? (
              // Placeholder for when the URL isn't set
              <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-lg text-gray-500 font-medium">Please add your Calendly URL in </p>
              </div>
            ) : (
              // The actual Calendly Widget
              <InlineWidget 
                url={calendlyUrl} 
                styles={{
                  height: '800px',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
              />
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Booking;