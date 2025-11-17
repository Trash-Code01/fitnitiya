/* eslint-disable no-unused-vars */
// src/sections/home/ResultsGallery.jsx

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. STATIC CONTENT SCHEMA ---
// (Content is the same)
const galleryContent = {
  heading: "See Our Client Transformations",
  subheading: "Hover on the images to see the 'after' results.",
  images: [
    {
      before: {
        img: "https://img.freepik.com/free-photo/fitness-female-woman-with-muscular-body-ready-workout-grey-wall_231208-3791.jpg?t=st=1763350113~exp=1763353713~hmac=ea83ed8a5b7e9bdbecded37122f833bfc482a569b857e22608aeabf621c7c445&w=1480",
        label: "Before: 45kg"
      },
      after: {
        img: "https://img.freepik.com/free-photo/fitness-female-woman-with-muscular-body-ready-workout-grey-wall_231208-3783.jpg?t=st=1763350143~exp=1763353743~hmac=8b9265e9c65de025f11391ffb6fce57b953a77b46650e722d7e0541951ad8814&w=1480",
        label: "After: +3.2kg"
      }
    },
    {
      before: {
        img: "https://img.freepik.com/free-photo/smiley-woman-holding-shopping-bags_23-2148647646.jpg?t=st=1763350412~exp=1763354012~hmac=ab565fad62cde619bbd435d81ad29cf811b03d5228f1a5aeb61323c143c34f84&w=1480",
        label: "Before: 50kg"
      },
      after: {
        img: "https://img.freepik.com/free-photo/smiley-woman-wearing-black-hat_23-2148647655.jpg?t=st=1763350396~exp=1763353996~hmac=02aceb7903133801a9f0ab7add62587a16a5df2de2a2f1fafe8a2e28c8c61715&w=1480",
        label: "After: +4kg"
      }
    },
    {
      before: {
        img: "https://img.freepik.com/free-photo/angry-woman_23-2147813571.jpg?t=st=1763350482~exp=1763354082~hmac=a5ce4505a3fddb8a28f126183087ce2e385a9d8f5e27edff99974141411c5337&w=1480",
        label: "Before: 48kg"
      },
      after: {
        img: "https://img.freepik.com/free-photo/portrait-smiling-woman_23-2147813594.jpg?t=st=1763350468~exp=1763354068~hmac=913bffd18d632fc6f75294fb9d9bec1fa84cf9f9e4267b8aee5cf93c36fecb8a&w=1480",
        label: "After: +2.5kg"
      }
    },
    {
      before: {
        img: "https://img.freepik.com/free-photo/fashionable-woman-palm-tree_23-2147811325.jpg?t=st=1763350639~exp=1763354239~hmac=089d1865dee0e48f0a195734e5b25ef7f59d9963823063eb0db2b1adbf59b7f8&w=1480",
        label: "Before: 52kg"
      },
      after: {
        img: "https://img.freepik.com/free-photo/woman-bikini-using-sun-cream_23-2147811448.jpg?t=st=1763350621~exp=1763354221~hmac=dc5f5fca785f859074287f8b6a3bd43abe0d359464abd0c72f5477b999fecd46&w=1480",
        label: "After: +3kg"
      }
    },
    {
      before: {
        img: "https://img.freepik.com/free-photo/young-woman-smiling-portrait_23-2148256320.jpg?t=st=1763350658~exp=1763354258~hmac=5196b2f673add2b4442f4e8ee9642cf51d31cf158c7170fc26ef1816cdea526f&w=1480",
        label: "Before: 47kg"
      },
      after: {
        img: "https://img.freepik.com/free-photo/portrait-pretty-woman-posing_23-2148256370.jpg?t=st=1763350694~exp=1763354294~hmac=b9152775ab78b50c518ee7f0e1d171c49b1b0b8111cfe8e2d5eb218edbb41661&w=1480",
        label: "After: +3.2kg"
      }
    },
    {
      before: {
        img: "https://img.freepik.com/free-photo/funny-young-model-underwear-denim-jacket-keeping-kepi-shouting-grey-isolated-background-sexy-girl-looking-camera-laughing-studio-concept-fashion-beauty_132075-12411.jpg?t=st=1763350890~exp=1763354490~hmac=d9c496afd72804a1147572d590f27c5fb0e0b19a4335fcd0eb0bcd29ac9e9484&w=1480",
        label: "Before: 49kg"
      },
      after: {
        img: "https://img.freepik.com/free-photo/beautiful-amazing-brunette-woman-with-long-wavy-hairstyle-spring-fall-stylish-urban-outfit-walking-street-red-lips-slim-body-street-fashion-concept_273443-1191.jpg?t=st=1763350943~exp=1763354543~hmac=9c704fd4b0d5da75977bddfc4baff0dffca1bae9eab06f3e121014966bb1de1d&w=1480",
        label: "After: +4kg"
      }
    },
    {
      before: {
        img: "https://img.freepik.com/free-photo/enjoying-trainning_23-2147636907.jpg?t=st=1763350975~exp=1763354575~hmac=9d0554e190513cee199014aa4245f3fa3d3a2c98a2f934109885df3426a8af56&w=1480",
        label: "Before: 51kg"
      },
      after: {
        img: "https://img.freepik.com/free-photo/dancing-trainning_23-2147636906.jpg?t=st=1763351000~exp=1763354600~hmac=f6e14f8b20152961c241d498bf929e7013a2b8a545c2a594cd17ca72ee3a0eb8&w=1480",
        label: "After: +2.5kg"
      }
    },
    {
      before: {
        img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600&h=600&auto=format&fit=crop",
        label: "Before: 53kg"
      },
      after: {
        img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&h=600&auto=format&fit=crop",
        label: "After: +3kg"
      }
    }
  ]
};

// --- 2. FLOATING ANIMATION ---
const floatVariant = {
  float: {
    y: ["-6px", "6px", "-6px"],
  },
};

// --- 3. PIXEL CARD SUB-COMPONENT ---
const PixelTransitionCard = ({ before, after, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const numPixels = 100;
  const numCols = 10;
  
  const pixels = useMemo(() => 
    [...Array(numPixels).keys()].sort(() => 0.5 - Math.random()), 
  [numPixels]);

  return (
    <motion.div
      variants={floatVariant}
      animate="float"
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: delay
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full rounded-lg overflow-hidden shadow-lg 
                 border border-gray-100" // Card container
    >
      {/* 1. Image Area (80%) */}
      <div
        className="relative w-full aspect-square overflow-hidden"
        style={{ height: '80%' }}
      >
        {/* Layer 1 (Bottom): "After" Image */}
        <img
          src={after.img}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Layer 2 (Top): Clean "Before" Image */}
        <motion.img
          src={before.img}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.1, delay: 0.1 }}
        />

        {/* Layer 3 (Pixel Grid): This is the transition layer */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute inset-0 grid grid-cols-10 grid-rows-10"
              initial={{ opacity: 1 }}
              exit={{ opacity: 1 }}
            >
              {pixels.map((index) => {
                const row = Math.floor(index / numCols);
                const col = index % numCols;
                
                return (
                  <motion.div
                    key={index}
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${before.img})`,
                      backgroundSize: '1000% 1000%',
                      backgroundPosition: `${col * 100 / (numCols - 1)}% ${row * 100 / (numCols - 1)}%`,
                    }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{
                      duration: 0.1,
                      delay: 0.1 + Math.random() * 0.4,
                      ease: "easeIn"
                    }}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Text Area (20%) */}
      <div 
        className="w-full p-4 bg-white relative"
        style={{ height: '20%' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isHovered ? "after" : "before"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0 p-4 flex items-center"
          >
            <span 
              className={`font-semibold font-inter ${
                isHovered ? "text-pink-500" : "text-gray-500"
              }`}
            >
              {isHovered ? after.label : before.label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- 4. MAIN COMPONENT ---
const ResultsGallery = () => {
  const { heading, subheading, images } = galleryContent;

  return (
    <section className="w-full py-24 md:py-32 bg-white">
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

        {/* === 2x4 RESULTS GRID === */}
        {/* --- THIS IS THE FIX --- */}
        {/* 'grid-cols-2' is now the default, 'lg:grid-cols-4' is for large screens */}
        <div className="grid grid-cols-2 lg:grid-cols-4 
                      gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16"
        >
          {images.map((image, index) => (
            <PixelTransitionCard
              key={index}
              before={image.before}
              after={image.after}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsGallery;