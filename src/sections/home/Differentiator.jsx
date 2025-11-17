/* eslint-disable no-unused-vars */
// src/sections/home/Differentiator.jsx

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

// --- 1. STATIC CONTENT SCHEMA ---
const differentiatorContent = {
  // Updated heading to be an array for the reveal effect
  heading: [
    "How Fitniya",
    "Is Different"
  ],
  subheading: "We're not just another fitness app. We're a 1:1 coaching partnership focused exclusively on women's healthy weight gain.",
  features: [
    {
      feature: "100% Women-Focused",
      fitniya: { icon: FaCheckCircle, text: "Yes", color: "text-pink-500" },
      others: { icon: FaTimesCircle, text: "No", color: "text-gray-400" }
    },
    {
      feature: "Athlete-Led Coaching",
      fitniya: { icon: FaCheckCircle, text: "Yes", color: "text-pink-500" },
      others: { icon: FaTimesCircle, text: "No", color: "text-gray-400" }
    },
    {
      feature: "True 1:1 Support",
      fitniya: { icon: FaCheckCircle, text: "Yes", color: "text-pink-500" },
      others: { icon: FaExclamationTriangle, text: "Group/Chatbot", color: "text-yellow-500" }
    },
    {
      feature: "Personalized Nutrition",
      fitniya: { icon: FaCheckCircle, text: "Custom", color: "text-pink-500" },
      others: { icon: FaExclamationTriangle, text: "Generic", color: "text-yellow-500" }
    },
    {
      feature: "Visible Results in 30 Days",
      fitniya: { icon: FaCheckCircle, text: "Guaranteed", color: "text-pink-500" },
      others: { icon: FaTimesCircle, text: "Unlikely", color: "text-gray-400" }
    }
  ]
};

// --- 2. SCROLL REVEAL TEXT SUB-COMPONENT ---
// (Copied from previous sections)
const ScrollRevealText = ({ textContent, activeIndex }) => {
  let wordIndex = 0;
  return (
    <div className="text-center">
      {textContent.map((line, lineIndex) => (
        <div key={lineIndex} className="mb-2">
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
        .word {
          font-size: 72px;
        }
        @media (max-width: 768px) { .word { font-size: 56px; } }
        @media (max-width: 480px) { .word { font-size: 44px; } }
      `}</style>
    </div>
  );
};

// --- 3. ANIMATION VARIANTS ---
// Parent container for staggering
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

// Variant for each table row
const rowVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- 4. MAIN COMPONENT ---
const Differentiator = () => {
  const { heading, subheading, features } = differentiatorContent;

  // --- Hooks for Text Reveal ---
  const [activeIndex, setActiveIndex] = useState(-1);
  const headingContainerRef = useRef(null);
  const totalWords = useMemo(() => heading.join(' ').split(' ').length, [heading]);
  
  // useEffect for the Text Reveal scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (!headingContainerRef.current) return;
      
      const { top, height } = headingContainerRef.current.getBoundingClientRect();
      const scrollProgress = (window.innerHeight / 2 - top) / height;
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      const newActiveIndex = Math.floor(clampedProgress * totalWords);
      
      setActiveIndex(newActiveIndex);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalWords]);

  return (
    <section className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* === HEADER TEXT (Updated) === */}
        <div 
          ref={headingContainerRef} 
          className="text-center mb-16"
        >
          <ScrollRevealText textContent={heading} activeIndex={activeIndex} />
          
          <motion.p 
            className="text-lg text-gray-700 max-w-2xl mx-auto mt-6 font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.5 }} // Delay to let text reveal start
          >
            {subheading}
          </motion.p>
        </div>

        {/* === ANIMATED COMPARISON TABLE === */}
        <motion.div 
          className="w-full max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 p-4 font-inter font-semibold text-left text-gray-500 border-b-2 border-gray-200">
            <div className="col-span-1">Feature</div>
            <div className="col-span-1 text-center">Fitniya</div>
            <div className="col-span-1 text-center">Others</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {features.map((item) => (
              <motion.div 
                key={item.feature}
                className="grid grid-cols-3 gap-4 p-5 items-center"
                variants={rowVariants}
              >
                {/* Feature */}
                <div className="col-span-1 font-semibold text-black font-inter text-base md:text-lg">
                  {item.feature}
                </div>
                
                {/* Fitniya */}
                <div className="col-span-1 flex flex-col items-center text-center">
                  <item.fitniya.icon className={`text-2xl ${item.fitniya.color}`} />
                  <span className="text-sm text-gray-700 mt-1 hidden md:block">{item.fitniya.text}</span>
                </div>

                {/* Others */}
                <div className="col-span-1 flex flex-col items-center text-center">
                  <item.others.icon className={`text-2xl ${item.others.color}`} />
                  <span className="text-sm text-gray-500 mt-1 hidden md:block">{item.others.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Differentiator;