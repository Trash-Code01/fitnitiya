/* eslint-disable no-unused-vars */
// src/sections/home/VideoStory.jsx

import React from 'react';
import { motion } from 'framer-motion';

// --- 1. STATIC CONTENT SCHEMA ---
const videoStoryContent = {
  // Replace this with your actual video file in /public/videos/
  videoURL: "https://www.pexels.com/download/video/3196218/", 
  heading: "“This isn’t just about gaining weight... it’s about gaining a voice, a presence, and the confidence to finally take up space in the world.”"
};

// --- 2. MAIN COMPONENT ---
const VideoStory = () => {
  const { videoURL, heading } = videoStoryContent;

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      
      {/* 1. Background Video */}
      <video
        className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        src={videoURL}
        autoPlay
        loop
        muted
        playsInline // Important for iOS
      />
      
      {/* 2. Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* 3. Content Layer */}
      <div className="relative z-20 flex items-center justify-center h-full text-center px-4 md:px-8">
        <motion.h2
          className="text-3xl md:text-5xl font-bold font-playfair text-white max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {heading}
        </motion.h2>
      </div>
    </section>
  );
};

export default VideoStory;