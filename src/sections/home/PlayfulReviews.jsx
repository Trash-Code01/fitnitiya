/* eslint-disable no-unused-vars */
// src/sections/home/PlayfulReviews.jsx

import React from 'react';
import { motion } from 'framer-motion';

// --- 1. STATIC CONTENT SCHEMA ---
const playfulContent = {
  heading: "See Our Client Reviews",
  subheading: "Real results, real conversations. (Go on, you can drag them around!)",
  chats: [
    // Row 1
    { img: "https://d1yei2z3i6k35z.cloudfront.net/11951926/67f42b512bfc4_IMG_0966.jpeg", alt: "WhatsApp review 1" },
    { img: "https://d1yei2z3i6k35z.cloudfront.net/11951926/67f42aee8ce4e_IMG_0962.jpeg", alt: "WhatsApp review 2" },
    { img: "https://d1yei2z3i6k35z.cloudfront.net/11951926/67f42b512bfc4_IMG_0966.jpeg", alt: "WhatsApp review 3" },
    { img: "https://d1yei2z3i6k35z.cloudfront.net/11951926/67f42aee8ce4e_IMG_0962.jpeg", alt: "WhatsApp review 4" },
    // Row 2 (Added)
    { img: "https://d1yei2z3i6k35z.cloudfront.net/11951926/67f42aee8ce4e_IMG_0962.jpeg", alt: "WhatsApp review 5" },
    { img: "https://d1yei2z3i6k35z.cloudfront.net/11951926/67f42b512bfc4_IMG_0966.jpeg", alt: "WhatsApp review 6" },
    { img: "https://d1yei2z3i6k35z.cloudfront.net/11951926/67f42aee8ce4e_IMG_0962.jpeg", alt: "WhatsApp review 7" },
    { img: "https://d1yei2z3i6k35z.cloudfront.net/11951926/67f42b512bfc4_IMG_0966.jpeg", alt: "WhatsApp review 8" }
  ]
};

// --- 2. ANIMATION VARIANTS ---
// Floating animation
const floatVariant = {
  float: {
    y: ["-8px", "8px", "-8px"],
  },
};

// Staggered grid container
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    }
  }
};

// Fade-in for each item
const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

// --- 3. MAIN COMPONENT ---
const PlayfulReviews = () => {
  const { heading, subheading, chats } = playfulContent;

  return (
    <section className="w-full py-24 md:py-32 bg-gradient-to-b from-[#FDF1F5] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* === HEADER TEXT === */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-black">
            {heading}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-6 font-inter">
            {subheading}
          </p>
        </motion.div>

        {/* === DRAGGABLE CHAT GRID === */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {chats.map((chat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants} // Staggered fade-in
              
              // --- DRAG LOGIC ON THE *OUTER* DIV ---
              drag
              dragSnapToOrigin={true}
              whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 50 }}
              className="w-full cursor-grab"
            >
              {/* This inner div just FLOATS */}
              <motion.img
                src={chat.img}
                alt={chat.alt}
                variants={floatVariant}
                animate="float" // Continuous float
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: index * 0.1
                }}
                className="rounded-lg shadow-lg w-full"
                // Prevent image's native drag-and-drop
                onDragStart={(e) => e.preventDefault()}
                draggable="false"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlayfulReviews;