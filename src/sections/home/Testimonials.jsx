/* eslint-disable no-unused-vars */
// src/sections/home/Testimonials.jsx

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

// --- 1. STATIC CONTENT SCHEMA ---
const testimonialsContent = {
  heading: [
    "What Our",
    "Clients Say"
  ],
  subheading: "Don't just take our word for it. Hear from the women who have transformed their lives with Fitniya.",
  reviews: [
    {
      name: "Ananya R.",
      title: "Gained 4kg in 6 weeks",
      stars: 5,
      quote: "I was always the 'skinny girl' who hated eating. Niyati and Yash didn't just give me a meal plan; they taught me about food freedom. I've gained 4kg, and my confidence is through the roof.",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&h=600&auto=format&fit=crop"
    },
    {
      name: "Priya S.",
      title: "Gained 3.2kg in 28 days",
      stars: 5,
      quote: "The 1:1 support was the game-changer. They held me accountable every single day. I'm stronger than I've ever been.",
      img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&h=600&auto=format&fit=crop"
    },
    {
      name: "Meera J.",
      title: "Built sustainable habits",
      stars: 5,
      quote: "This is the first program that didn't feel like a punishment. I learned how to eat for my body and my fast metabolism. I'm not just heavier; I'm healthier and happier.",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&h=600&auto=format&fit=crop"
    }
  ]
};

// --- 2. SCROLL REVEAL TEXT SUB-COMPONENT ---
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
        .word { font-size: 72px; }
        @media (max-width: 768px) { .word { font-size: 56px; } }
        @media (max-width: 480px) { .word { font-size: 44px; } }

        /* Utility to hide scrollbar */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

// --- 3. ANIMATION VARIANTS (For Desktop) ---
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// --- 4. CARD SUB-COMPONENT ---
// Reusable card to avoid duplicating code
const ReviewCard = ({ review }) => (
  <div className="flex flex-col items-center text-center bg-white p-5 md:p-8 rounded-xl shadow-lg border border-gray-100 h-full">
    <img 
      src={review.img} 
      alt={review.name} 
      className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover mx-auto mb-3 md:mb-4 border-2 md:border-4 border-pink-100"
    />
    <div className="flex justify-center space-x-1 mb-3 md:mb-4">
      {[...Array(review.stars)].map((_, i) => (
        <FaStar key={i} className="text-yellow-400 text-base md:text-lg" />
      ))}
    </div>
    <p className="text-sm md:text-lg font-playfair text-black italic mb-3 md:mb-4 leading-relaxed">
      "{review.quote}"
    </p>
    <p className="text-sm md:text-base font-bold text-black font-inter">
      - {review.name}
    </p>
    <p className="text-xs md:text-sm text-pink-500 font-inter">
      {review.title}
    </p>
  </div>
);


// --- 5. MAIN COMPONENT ---
const Testimonials = () => {
  const { heading, subheading, reviews } = testimonialsContent;

  const [activeIndex, setActiveIndex] = useState(-1);
  const headingContainerRef = useRef(null);
  const totalWords = useMemo(() => heading.join(' ').split(' ').length, [heading]);
  
  // useEffect for the Text Reveal
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

  return (
    <section className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto md:px-8">
        
        {/* === HEADER TEXT === */}
        <div 
          ref={headingContainerRef} 
          className="text-center mb-16 px-4"
        >
          <ScrollRevealText textContent={heading} activeIndex={activeIndex} />
          
          <motion.p 
            className="text-lg text-gray-700 max-w-2xl mx-auto mt-6 font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {subheading}
          </motion.p>
        </div>

        {/* --- MOBILE HORIZONTAL SCROLL --- */}
        <div className="md:hidden pl-4">
          <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x snap-mandatory scroll-smooth">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                className="flex-shrink-0 w-[65vw] snap-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
            <div className="flex-shrink-0 w-3"></div>
          </div>
        </div>

        {/* --- DESKTOP 3-COLUMN GRID --- */}
        <motion.div 
          className="hidden md:grid md:grid-cols-3 gap-8" // Hidden on mobile
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {reviews.map((review) => (
            <motion.div key={review.name} variants={cardVariants}>
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;