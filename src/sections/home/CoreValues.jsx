/* eslint-disable no-unused-vars */
// src/sections/home/CoreValues.jsx

import React from 'react';
import { motion } from 'framer-motion';
// Importing relevant icons
import { IoIosHeart, IoIosRocket, IoIosBody, IoIosBonfire, IoIosRibbon, IoIosTrendingUp } from 'react-icons/io';

// --- 1. STATIC CONTENT SCHEMA ---
const coreValuesContent = {
  heading: "Our Coaching Principles",
  subheading: "This isn't just a program; it's a partnership built on trust, science, and a genuine desire to see you win.",
  values: [
    {
      icon: IoIosHeart,
      title: "Empathy First",
      description: "We listen to understand. We know this journey is personal, and we're here to support you, not just train you."
    },
    {
      icon: IoIosRocket,
      title: "Science-Backed",
      description: "No fads, no guesswork. Our methods are rooted in nutritional science and proven exercise physiology."
    },
    {
      icon: IoIosBody,
      title: "Real Connection",
      description: "You're not a number in an app. You get real, human support from coaches who are invested in your success."
    },
    {
      icon: IoIosTrendingUp,
      title: "Sustainable Growth",
      description: "We focus on building habits that last a lifetime, not just quick fixes that fade in a few weeks."
    },
    {
      icon: IoIosBonfire,
      title: "Empowerment Over Aesthetics",
      description: "Our primary goal is to make you feel strong, confident, and capable. The aesthetics are just a bonus."
    },
    {
      icon: IoIosRibbon,
      title: "Uncompromising Quality",
      description: "From our program design to our support, we deliver a premium, high-touch experience. No exceptions."
    }
  ]
};

// --- 2. ANIMATION VARIANTS ---
// This is the parent container that staggers the children
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Each child animates 0.15s after the previous
    }
  }
};

// This is the variant for each individual grid item
const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- 3. MAIN COMPONENT ---
const CoreValues = () => {
  const { heading, subheading, values } = coreValuesContent;

  return (
    <section className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        
        {/* === HEADER TEXT === */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold font-playfair text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          {heading}
        </motion.h2>

        <motion.p 
          className="text-lg text-gray-700 max-w-2xl mx-auto mt-6 font-inter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {subheading}
        </motion.p>

        {/* === STAGGERED VALUES GRID === */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the grid is visible
        >
          {values.map((value) => (
            <motion.div 
              key={value.title} 
              className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100"
              variants={itemVariants} // Each grid item uses this variant
            >
              <value.icon className="text-5xl text-pink-400 mb-5" />
              <h3 className="text-2xl font-bold font-playfair text-black mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValues;