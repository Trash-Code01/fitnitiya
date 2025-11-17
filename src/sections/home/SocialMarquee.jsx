// src/sections/home/SocialMarquee.jsx

import React from 'react';
import { FaStar } from 'react-icons/fa';
import { IoShieldCheckmark } from "react-icons/io5";

// --- 1. STATIC CONTENT SCHEMA ---
const marqueeContent = [
  "⭐ 4.9/5 Rated",
  "1200+ Women Transformed",
  "Featured in Shape India",
  "Athlete-Led Coaching"
];

// --- 2. MAIN COMPONENT ---
const SocialMarquee = () => {
  return (
    <>
      {/* This style tag injects the animation. 
        It's the same as our fast 'marquee-scroll' from the hero.
      */}
      <style jsx>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee-scroll {
          animation: marquee-scroll 40s linear infinite;
        }
      `}</style>
      
      {/* We use a dark background for high contrast, as seen in the wireframe */}
      <section className="w-full py-8 md:py-10 bg-gray-900 text-white overflow-hidden">
        <div className="whitespace-nowrap">
          <div className="animate-marquee-scroll inline-block">
            {/* First copy */}
            {marqueeContent.map((text) => (
              <span 
                key={text} 
                className="flex items-center text-lg md:text-xl font-semibold text-gray-200 mx-10 inline-flex"
              >
                <IoShieldCheckmark className="text-pink-400 mr-3 shrink-0" />
                {text}
              </span>
            ))}
            {/* Second copy (for seamless loop) */}
            {marqueeContent.map((text) => (
              <span 
                key={`${text}-copy`}
                className="flex items-center text-lg md:text-xl font-semibold text-gray-200 mx-10 inline-flex"
                aria-hidden="true"
              >
                <IoShieldCheckmark className="text-pink-400 mr-3 flex-shrink-0" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SocialMarquee;