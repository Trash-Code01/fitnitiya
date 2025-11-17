// src/sections/home/BrandMission.jsx

import React from 'react';
import { IoSparklesOutline } from 'react-icons/io5';

// --- 1. STATIC CONTENT SCHEMA ---
// All static content is defined here.
const marqueeContent = [
  "Personalized Coaching",
  "Science-Based Nutrition",
  "Sustainable Growth",
  "Empowerment Over Aesthetics",
  "Real Connection",
];

// --- 2. MAIN COMPONENT ---
// The default export component that assembles and displays the content.
const BrandMission = () => {
  return (
    <>
      {/* This style tag injects the animation keyframes directly.
        This follows the pattern from your 'About-mid-sec.jsx' example.
      */}
      <style jsx>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee-slow {
          animation: marquee-slow 80s linear infinite;
        }
      `}</style>
      
      <section className="w-full py-12 md:py-16 bg-white border-y border-gray-100 shadow-sm overflow-hidden">
        <div className="whitespace-nowrap">
          {/* The 'animate-marquee-slow' class is applied here.
            The content is duplicated to create a seamless loop.
          */}
          <div className="animate-marquee-slow inline-block">
            {/* First copy */}
            {marqueeContent.map((text) => (
              <span 
                key={text} 
                className="flex items-center text-xl md:text-2xl font-medium text-gray-700 mx-8 inline-flex"
              >
                <IoSparklesOutline className="text-pink-400 mr-3 flex-shrink-0" />
                {text}
              </span>
            ))}
            {/* Second copy (for seamless loop) */}
            {marqueeContent.map((text) => (
              <span 
                key={`${text}-copy`}
                className="flex items-center text-xl md:text-2xl font-medium text-gray-700 mx-8 inline-flex"
                aria-hidden="true"
              >
                <IoSparklesOutline className="text-pink-400 mr-3 flex-shrink-0" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandMission;