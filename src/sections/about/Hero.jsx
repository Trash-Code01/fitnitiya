/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '../../components/AnimatedText';
import { IoSparkles } from 'react-icons/io5';

const Hero = ({ heading, subheading }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-white to-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <IoSparkles className="text-5xl text-pink-400 mx-auto" />
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold font-playfair text-black mb-6 leading-tight">
            {heading.split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.8 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <AnimatedText
            text={subheading}
            el="p"
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed"
            dimmedColor="text-gray-400"
            visibleColor="text-gray-800"
            stagger={120}
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-pink-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;