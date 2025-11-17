// src/sections/home/FinalMarquee.jsx

import React from 'react';
import { IoHeart } from 'react-icons/io5';

// --- 1. STATIC CONTENT SCHEMA ---
const marqueeContent = [
  "Gain Weight",
  "Gain Confidence",
  "Gain Energy",
  "Gain Love"
];

// --- 2. MAIN COMPONENT ---
const FinalMarquee = () => {
  return (
    <>
      {/* This style tag injects the slow marquee animation */}
      <style jsx>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee-slow {
          animation: marquee-slow 80s linear infinite;
        }
      `}</style>
      
      <section className="w-full py-16 md:py-20 bg-white border-t border-gray-100 overflow-hidden">
        <div className="whitespace-nowrap">
          <div className="animate-marquee-slow inline-block">
            {/* First copy of the content */}
            {marqueeContent.map((text) => (
              <span 
                key={text} 
                className="flex items-center text-xl md:text-3xl font-semibold text-gray-800 mx-10 inline-flex"
              >
                <IoHeart className="text-pink-400 mr-4" />
                {text}
              </span>
            ))}
            {/* Second copy (for seamless loop) */}
            {marqueeContent.map((text) => (
              <span 
                key={`${text}-copy`}
                className="flex items-center text-xl md:text-3xl font-semibold text-gray-800 mx-10 inline-flex"
                aria-hidden="true"
              >
                <IoHeart className="text-pink-400 mr-4" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FinalMarquee;