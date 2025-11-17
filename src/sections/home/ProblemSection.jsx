/* eslint-disable no-unused-vars */
// src/sections/home/ProblemSection.jsx

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaStar, FaLeaf } from 'react-icons/fa';
import { IoIosHeartDislike } from "react-icons/io";
import { motion } from 'framer-motion';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- 1. STATIC CONTENT SCHEMA ---
const problemContent = {
  mainHeading: [
    "Why Women", // <-- Line 1
    "Struggle to",  // <-- Line 2
    // "to Gain",   // <-- Line 3
    "Weight"     // <-- Line 4
  ],
  subheading: "Most programs are built for weight loss. We’re different. We understand the unique challenges women face when trying to build healthy, sustainable weight and strength.",
  problems: [
    {
      icon: FaStar,
      title: "Fast Metabolism",
      description: "You feel like you're constantly eating, but the scale just won't budge."
    },
    {
      icon: IoIosHeartDislike,
      title: "Poor Appetite",
      description: "The idea of eating *more* food feels overwhelming and, at times, nauseating."
    },
    {
      icon: FaLeaf,
      title: "Wrong Diets",
      description: "Following generic advice that's not tailored to your body, goals, or lifestyle."
    }
  ]
};

// --- 2. SCROLL REVEAL TEXT SUB-COMPONENT ---
const ScrollRevealText = ({ textContent, activeIndex }) => {
  let wordIndex = 0;
  
  return (
    <div>
      {textContent.map((line, lineIndex) => (
        // The line break is now controlled by the array
        <div key={lineIndex} className="mb-2"> 
          {line.split(' ').map((word, index) => {
            const currentWordIndex = wordIndex++;
            const isActive = currentWordIndex <= activeIndex;
            
            return (
              <span
                key={index}
                className={`word inline-block mr-4 font-bold font-playfair transition-colors duration-300 ease-in-out ${
                  isActive 
                    ? 'text-black' // Active words are black
                    : 'text-gray-200' // Inactive words are gray
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
        @media (max-width: 768px) {
          .word {
            font-size: 56px;
          }
        }
        @media (max-width: 480px) {
          .word {
            font-size: 44px;
          }
        }
      `}</style>
    </div>
  );
};

// --- 3. MAIN COMPONENT ---
const ProblemSection = () => {
  const { mainHeading, subheading, problems } = problemContent;

  const [activeIndex, setActiveIndex] = useState(-1);
  const headingContainerRef = useRef(null);
  const rightColRef = useRef(null);

  const totalWords = useMemo(() => mainHeading.join(' ').split(' ').length, [mainHeading]);
  
  // useEffect for the Text Reveal (Left Column)
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalWords]);

  // useEffect for the GSAP + ScrollTrigger (Right Column)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".problem-item"); 
      
      gsap.from(items, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightColRef.current,
          start: "top 75%",
          toggleActions: "restart reverse restart reverse" 
        }
      });
    }, rightColRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-4 md:px-8">
        
        {/* === LEFT COLUMN (Text Reveal + Para) === */}
        <div ref={headingContainerRef} className="flex flex-col space-y-8">
          <ScrollRevealText textContent={mainHeading} activeIndex={activeIndex} />
          
          <motion.p 
            className="text-lg text-gray-700 font-inter leading-relaxed max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {subheading}
          </motion.p>
        </div>
        
        {/* === RIGHT COLUMN (GSAP Slide-in Cards) === */}
        <div ref={rightColRef} className="flex flex-col justify-center space-y-10 pt-4">
          
          {problems.map((problem) => (
            <div 
              key={problem.title} 
              className="problem-item bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="flex items-start space-x-5">
                <problem.icon className="text-4xl text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold font-playfair text-black mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 font-inter">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;