/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const StoryCard = ({ section, index }) => {
  return (
    <motion.div
      className="relative bg-white p-10 md:p-12 rounded-2xl shadow-xl border border-gray-100"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -10, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)', transition: { duration: 0.3 } }}
    >
      <div className="relative z-10">
        <motion.div className="text-pink-500 font-bold text-xl mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: index * 0.2 + 0.3 }}>
          {section.number}
        </motion.div>
        <h3 className="text-3xl md:text-4xl font-bold font-playfair text-black mb-4">{section.title}</h3>
        <p className="text-lg text-gray-700 leading-relaxed font-inter">{section.content}</p>
      </div>
    </motion.div>
  );
};

const OriginStory = ({ sections }) => {
  return (
    <section className="w-full py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-6xl md:text-7xl font-bold font-playfair text-black mb-6">Our Story</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-inter">The journey that led us to create Fitniya</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {sections.map((section, index) => (
            <StoryCard key={index} section={section} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OriginStory;