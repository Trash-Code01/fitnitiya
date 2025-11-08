/* eslint-disable no-unused-vars */
// src/sections/home/Hero.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell, FaStar } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import FluidButton from '../../components/FluidButton';
import AnimatedText from '../../components/AnimatedText'; // <-- Import new component

// --- Animation Variants ---
const floatVariant = {
  float: {
    y: ["-8px", "8px", "-8px"],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const flashInVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 1.5,
    },
  },
};

// --- Hero Component ---
const Hero = () => {
  return (
    <section
      className="w-full min-h-screen bg-gradient-to-b from-[#FDF1F5] to-white" // <-- Gradient bg
      style={{ paddingTop: '128px' }} // Padding for navbar
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
        
        {/* === 1. LEFT COLUMN (Text Content) === */}
        <div className="flex flex-col justify-center text-left py-12">
          
          {/* Subheading */}
          <motion.h2
            className="text-lg font-semibold text-gray-500 uppercase font-inter" // <-- Updated text & font
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Find Your Strength
          </motion.h2>

          {/* Animated Main Heading */}
          <AnimatedText
            el="h1"
            text="Gain Weight the Smart, Healthy & Confident Way"
            className="text-5xl md:text-6xl font-bold mt-4 font-playfair leading-snug" // <-- Font & line-height
            dimmedColor="text-gray-400"
            visibleColor="text-black"
            stagger={150}
          />

          {/* Animated Paragraph */}
          <AnimatedText
            el="p"
            text="Designed exclusively for women who are ready to own their strength, build their body, and find lasting confidence."
            className="text-lg text-gray-700 mt-6 max-w-lg font-inter" // <-- Font
            dimmedColor="text-gray-400"
            visibleColor="text-gray-700"
            stagger={50}
          />

          {/* CTA Button */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5 }} // Delayed to allow text animation to play
          >
            <FluidButton href="/booking" text="Book Your Free 1:1 Call Now" />
          </motion.div>
        </div>

        {/* === 2. RIGHT COLUMN (Model & Animations) === */}
        <div className="relative flex items-center justify-center min-h-[400px]">
          
          {/* --- Floating Dumbbell Icon --- */}
          <motion.div
            className="absolute top-10 right-10 text-4xl text-gray-800"
            variants={floatVariant}
            animate="float"
          >
            <FaDumbbell />
          </motion.div>
          
          {/* --- Floating Sparkles Icon --- */}
          <motion.div
            className="absolute top-20 left-10 text-4xl text-yellow-500"
            variants={floatVariant}
            animate="float"
            style={{ transitionDelay: '0.5s' }}
          >
            <IoSparkles />
          </motion.div>

          {/* --- Model Image --- */}
          <motion.div
            className="relative w-[300px] h-[450px] md:w-[350px] md:h-[500px] bg-gray-200 rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <img 
              src="https://placehold.co/350x500/E0E0E0/B0B0B0?text=Gym+Model" 
              alt="Fitniya gym model" 
              className="w-full h-full object-cover" 
            />
          </motion.div>

          {/* --- "Flash-in" Review Card --- */}
          <motion.div
            className="absolute bottom-10 -left-10 bg-white p-4 rounded-lg shadow-xl flex items-center space-x-3"
            variants={flashInVariant}
            initial="hidden"
            animate="visible"
          >
            <div className="flex-shrink-0 bg-yellow-400 p-3 rounded-full">
              <FaStar className="text-white" />
            </div>
            <div>
              <p className="font-bold text-black">4.9/5 Rating</p>
              <p className="text-sm text-gray-600">1200+ Women</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;