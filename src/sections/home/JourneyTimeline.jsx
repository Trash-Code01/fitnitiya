/* eslint-disable no-unused-vars */
// src/sections/home/JourneyTimeline.jsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FluidButton from '../../components/FluidButton'; // <-- THIS IS THE FIX

// --- 1. STATIC CONTENT SCHEMA ---
const journeyContent = {
  heading: "Your 30-Day Transformation",
  subheading: "A step-by-step look at how you'll build confidence, strength, and sustainable habits.",
  cta: {
    text: "Start My Journey",
    href: "/booking"
  },
  steps: [
    {
      title: "Day 1-3: Setup & Onboarding",
      description: "We deep-dive into your goals, habits, and lifestyle. You'll get your personalized nutrition blueprint.",
      icon: "1"
    },
    {
      title: "Week 1: Finding Your Energy",
      description: "You'll start your new eating and workout plan. The focus is on consistency and finding a new rhythm.",
      icon: "2"
    },
    {
      title: "Week 2: Seeing The Change",
      description: "You'll feel stronger in your workouts and notice the first positive changes in the mirror.",
      icon: "3"
    },
    {
      title: "Week 3-4: The Glow Up",
      description: "Your new habits are locked in. Your energy is high, your clothes fit differently, and your confidence is soaring.",
      icon: "4"
    },
    {
      title: "Day 30: Confidence Unlocked",
      description: "You've proven to yourself that you can do this. You have the tools and the confidence to keep going.",
      icon: "5"
    }
  ]
};

// --- 2. ANIMATION VARIANTS ---
// Parent container for staggering
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    }
  }
};

// Variant for each timeline item
const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// --- 3. MAIN COMPONENT ---
const JourneyTimeline = () => {
  const { heading, subheading, cta, steps } = journeyContent;

  const timelineRef = useRef(null);
  
  // Animate the vertical line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end end"]
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="w-full py-24 md:py-32 bg-gray-50"> {/* Light bg to separate sections */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* === HEADER TEXT === */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
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

        {/* === ANIMATED TIMELINE === */}
        <div ref={timelineRef} className="relative w-full max-w-md mx-auto">
          
          {/* The vertical line */}
          <div className="absolute top-0 left-5 w-1 h-full bg-gray-200" />
          
          {/* The animated "progress" line */}
          <motion.div 
            className="absolute top-0 left-5 w-1 h-full bg-pink-400 origin-top"
            style={{ scaleY: lineScaleY }}
          />
          
          {/* Timeline Items */}
          <motion.div 
            className="relative flex flex-col space-y-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step) => (
              <motion.div 
                key={step.title}
                className="flex items-start"
                variants={itemVariants}
              >
                {/* Step Circle */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-400 text-white flex items-center justify-center font-bold z-10">
                  {step.icon}
                </div>
                
                {/* Step Content */}
                <div className="ml-6">
                  <h3 className="text-2xl font-bold font-playfair text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 font-inter">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* === FINAL CTA === */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <FluidButton href={cta.href} text={cta.text} />
        </motion.div>

      </div>
    </section>
  );
};

export default JourneyTimeline;