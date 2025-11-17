/* eslint-disable no-unused-vars */
// src/sections/home/Hero.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDumbbell, FaStar } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import FluidButton from '../../components/FluidButton';
import AnimatedText from '../../components/AnimatedText';

// --- 1. STATIC CONTENT SCHEMA ---
const heroContent = {
  subheading: "Find Your Strength",
  heading: "Gain Weight the Smart, Healthy & Confident Way",
  paragraph: "Designed exclusively for women who are ready to own their strength, build their body, and find lasting confidence.",
  cta: {
    text: "Book Your Free 1:1 Call Now",
    href: "/booking",
  },
  modelImage: {
    url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Fitniya gym model",
  },
  review: [
    "💖 Trusted by 1000+ women",
    "⭐ 4.9/5 Rating",
    "💪 Athlete-Led Coaching"
  ],
};

// --- 2. ANIMATION VARIANTS ---
const floatVariant = {
  float: {
    y: ["-8px", "8px", "-8px"],
    transition: { duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
  },
};

const reviewVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 1.5,
    },
  },
};

// --- 3. MAIN COMPONENT ---
const Hero = () => {
  const { subheading, heading, paragraph, cta, modelImage, review } = heroContent;
  
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prevIndex) => (prevIndex + 1) % review.length);
    }, 3000); 

    return () => clearInterval(timer);
  }, [review.length]);

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-b from-[#FDF1F5] to-white"
      style={{ paddingTop: '128px' }} // Padding for navbar
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
        
        {/* === LEFT COLUMN (Text Content) === */}
        <div className="flex flex-col justify-center text-left py-12">
          
          <motion.h2
            className="text-lg font-semibold text-gray-500 uppercase font-inter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {subheading}
          </motion.h2>

          <AnimatedText
            el="h1"
            text={heading}
            className="text-5xl md:text-6xl font-bold mt-4 font-playfair leading-snug"
            dimmedColor="text-gray-400"
            visibleColor="text-black"
            stagger={350} // <-- SLOWED DOWN (was 250)
          />

          <AnimatedText
            el="p"
            text={paragraph}
            className="text-lg text-gray-700 mt-6 max-w-lg font-inter"
            dimmedColor="text-gray-400"
            visibleColor="text-gray-700"
            stagger={150} // <-- SLOWED DOWN (was 100)
          />

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5 }}
          >
            <FluidButton href={cta.href} text={cta.text} />
          </motion.div>
        </div>

        {/* === 2. RIGHT COLUMN (Model, Icons & Review) === */}
        <div className="relative flex items-center justify-center min-h-[400px]">
          
          {/* --- Floating Icons --- */}
          <motion.div
            className="absolute top-10 right-10 text-4xl text-gray-800"
            variants={floatVariant}
            animate="float"
          >
            <FaDumbbell />
          </motion.div>
          <motion.div
            className="absolute top-20 left-10 text-4xl text-yellow-500"
            variants={floatVariant}
            animate="float"
            style={{ transitionDelay: '0.5s' }}
          >
            <IoSparkles />
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-10 text-4xl text-yellow-400"
            variants={floatVariant}
            animate="float"
            style={{ transitionDelay: '0.2s' }}
          >
            <FaStar />
          </motion.div>
          
          {/* --- Vertical Stack (Image + Review) --- */}
          <div className="flex flex-col items-center">
            {/* Model Image */}
            <motion.div
              className="relative w-[300px] h-[450px] md:w-[350px] md:h-[500px] bg-gray-200 rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <img 
                src={modelImage.url} 
                alt={modelImage.alt} 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* "Tostify" Review (Below Image) */}
            <motion.div
              className="mt-6 text-center h-6" // Added h-6 for layout stability
              variants={reviewVariant}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={reviewIndex}
                  className="font-medium text-gray-700 font-inter text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {review[reviewIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;