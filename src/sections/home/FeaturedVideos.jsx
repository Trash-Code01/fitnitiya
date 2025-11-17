/* eslint-disable no-unused-vars */
// src/sections/home/FeaturedVideos.jsx

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import FluidButton from '../../components/FluidButton';

// --- 1. STATIC CONTENT SCHEMA ---
const videoContent = {
  heading: "Connect With Us on Instagram",
  subheading: "See daily tips, client stories, and behind-the-scenes content.",
  cta: {
    text: "Follow @Fitniya",
    href: "https://www.instagram.com/" // Replace with your Insta link
  },
  videos: [
    {
      // Pexels video link
      videoUrl: "https://www.pexels.com/download/video/34708331/",
      link: "https://www.instagram.com/p/your-video-id-1" // Replace
    },
    {
      videoUrl: "https://www.pexels.com/download/video/2785536/",
      link: "https://www.instagram.com/p/your-video-id-2" // Replace
    },
    {
      videoUrl: "https://www.pexels.com/download/video/2785531/",
      link: "https://www.instagram.com/p/your-video-id-3" // Replace
    },
    {
      videoUrl: "https://www.pexels.com/download/video/2785532/",
      link: "https://www.instagram.com/p/your-video-id-4" // Replace
    }
    // You can add more videos here, and they will just extend the scroll
  ]
};

// --- 2. VIDEO CARD SUB-COMPONENT (Refactored) ---
const VideoCard = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // This handles the play/pause logic
  const handlePlayPause = (e) => {
    e.preventDefault(); // Stop the link from opening
    e.stopPropagation();

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    // The card is a link to the Instagram post
    <a 
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-full aspect-[3/4] rounded-lg overflow-hidden block shadow-lg group"
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        loop
        muted
        playsInline
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      
      {/* Subtle dark overlay on hover */}
      <div 
        className="absolute inset-0 bg-black/10 transition-all opacity-0 group-hover:opacity-100"
      />
      
      {/* Custom Play/Pause Button (bottom-right) */}
      <button
        onClick={handlePlayPause}
        className="absolute bottom-4 right-4 z-10 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white text-lg transition-all duration-300 group-hover:bg-white/50"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </a>
  );
};

// --- 3. MAIN COMPONENT ---
const FeaturedVideos = () => {
  const { heading, subheading, cta, videos } = videoContent;

  return (
    <section className="w-full py-24 md:py-32 bg-gradient-to-b from-[#FDF1F5] to-white">
      <div className="max-w-7xl mx-auto">
        
        {/* === HEADER TEXT === */}
        <motion.div 
          className="text-center mb-16 px-4"
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

        {/* --- HORIZONTAL SCROLL CONTAINER (FOR ALL SIZES) --- */}
        <div className="w-full">
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          
          <motion.div 
            className="flex overflow-x-auto gap-6 md:gap-8 pb-4 hide-scrollbar px-4 md:pl-8" // Added padding
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            {videos.map((video, index) => (
              <motion.div
                key={index}
                // --- Card Widths ---
                // Mobile: 70% of viewport
                // Desktop: 30% width
                className="flex-shrink-0 w-[70vw] md:w-[30%] lg:w-[22%]" 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} // Triggers as card slides in
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <VideoCard video={video} />
              </motion.div>
            ))}
            {/* Padding at the end */}
            <div className="flex-shrink-0 w-1 md:w-4"></div>
          </motion.div>
        </div>

        {/* === MAIN CTA BUTTON === */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <FluidButton 
            href={cta.href} 
            text={cta.text} 
            className="py-3 px-8 text-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedVideos;