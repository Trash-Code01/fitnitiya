/* eslint-disable no-unused-vars */
// src/sections/home/FounderIntro.jsx

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdQuote } from "react-icons/io";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// --- THIS IS THE FIX ---
import useTypewriter from '../../hooks/Typewriter'; // <-- Removed .js extension

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- 1. STATIC CONTENT SCHEMA ---
// Updated with new Unsplash images
const founderIntroContent = {
  founder: {
    name: "Yash Chauhan",
    title: "Founder & Head Coach",
    paragraph: "As the lead architect of the Fitniya system, Yash brings over a decade of athletic and nutritional science to the table. His focus is on building robust, science-backed programs that deliver real, measurable results.",
    quote: "We build systems, not just workouts. Results are inevitable.",
    image: {
      // New Unsplash Founder Image
      url: "https://img.freepik.com/free-photo/portrait-elegant-professional-businessman_23-2150917272.jpg?t=st=1763351554~exp=1763355154~hmac=2b0650da7e7936357a0a634c1a00c38dc317340c22d426f05d5adabd4b8dbbf1&w=1480",
      alt: "Yash Chauhan, Founder of Fitniya"
    }
  },
  cofounder: {
    name: "Niyati Chauhan",
    title: "Cofounder & Confidence Coach",
    paragraph: "Niyati is the heart of Fitniya. She’s spent 8+ years helping women move past frustration to find confidence. Her approach isn’t just about food; it’s about building a stronger, healthier, and more empowered you.",
    quote: "I don’t transform bodies. I transform confidence.",
    image: {
      // New Unsplash Cofounder Image
      url: "https://img.freepik.com/free-photo/brunette-businesswoman-posing_23-2148142767.jpg?t=st=1763351361~exp=1763354961~hmac=728dc3768047e4bc557371d22b9fa5e29b22d51b1e8acc2af29f80e4b897a368&w=1480",
      alt: "Niyati Chauhan, Cofounder of Fitniya"
    }
  }
};

// --- 2. TYPEWRITER SUB-COMPONENT ---
const TypewriterParagraph = ({ text }) => {
  const typedText = useTypewriter(text, 30); // Use the hook
  return (
    <p className="text-lg text-gray-700 mt-6 font-inter leading-relaxed min-h-[150px]">
      {typedText}
      {/* Blinking cursor */}
      <span className="inline-block w-[2px] h-5 bg-gray-700 ml-1 animate-ping"></span>
    </p>
  );
};

// --- 3. MAIN COMPONENT ---
const FounderIntro = () => {
  const [activePerson, setActivePerson] = useState('founder'); // 'founder' or 'cofounder'
  const person = founderIntroContent[activePerson];

  // Refs for GSAP animations
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  // GSAP ScrollTrigger Animation
  useEffect(() => {
    // Create a GSAP context
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Start when 75% from top
          toggleActions: "play none none none" // Play once on enter
        }
      });

      // 1. Image slides in from left
      tl.from(imageRef.current, {
        xPercent: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
      
      // 2. Text slides in from right (at the same time)
      tl.from(textRef.current, {
        xPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "<"); // "<" means start at same time as previous animation

    }, sectionRef); // Scope context to the section

    return () => ctx.revert(); // Cleanup
  }, []); // Run once on mount

  return (
    <section 
      ref={sectionRef} 
      className="w-full py-24 md:py-32 bg-white overflow-hidden" // overflow-hidden is crucial
    >
      {/* --- Toggle Buttons --- */}
      <div className="flex justify-center items-center space-x-4 mb-16">
        <button
          onClick={() => setActivePerson('founder')}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            activePerson === 'founder' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Founder
        </button>
        <button
          onClick={() => setActivePerson('cofounder')}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            activePerson === 'cofounder' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Cofounder
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start px-4 md:px-8">
        
        {/* === 1. LEFT COLUMN (Image) === */}
        <div ref={imageRef}>
          {/* AnimatePresence handles the switch between images */}
          <AnimatePresence mode="wait">
            <motion.div
              key={person.name} // This triggers the animation
              className="relative w-full h-[400px] md:h-[550px] rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <motion.img
                src={person.image.url}
                alt={person.image.alt}
                className="absolute w-full h-full object-cover"
                // "Crazy" hover animation
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 2,
                  transition: { duration: 0.4, ease: 'easeOut' }
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* === 2. RIGHT COLUMN (Text) === */}
        <div ref={textRef} className="flex flex-col justify-start">
          {/* AnimatePresence handles switching all text content */}
          <AnimatePresence mode="out-in">
            <motion.div
              key={person.name} // Triggers animation on change
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <h3 className="text-lg font-semibold text-gray-500 uppercase font-inter">
                {person.title}
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold font-playfair text-black mt-2">
                {person.name}
              </h2>
              
              {/* Typewriter Paragraph */}
              <TypewriterParagraph text={person.paragraph} />

              {/* Quote Card */}
              <div className="bg-gradient-to-r from-[#FDF1F5] to-gray-50 border-l-4 border-pink-400 p-6 mt-8 rounded-lg shadow-sm">
                <IoMdQuote className="text-pink-400 text-4xl mb-3" />
                <p className="text-xl font-medium font-playfair text-gray-800 italic">
                  {person.quote}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FounderIntro;