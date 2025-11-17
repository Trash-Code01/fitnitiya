/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '../../components/AnimatedText';

const WhyCard = ({ card, index }) => {
  return (
    <motion.div
      className="group bg-gradient-to-br from-white to-pink-50 p-8 rounded-2xl shadow-lg border border-pink-100 text-center relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(236, 72, 153, 0.2)' }}
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <motion.div className="inline-block p-6 bg-pink-100 rounded-full mb-6" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
          <card.icon className="text-5xl text-pink-500" />
        </motion.div>
        <h3 className="text-2xl md:text-3xl font-bold font-playfair text-black mb-4">{card.title}</h3>
        <AnimatedText
          text={card.description}
          el="p"
          className="font-inter leading-relaxed text-lg"
          dimmedColor="text-gray-400"
          visibleColor="text-gray-700"
          stagger={120}
        />
      </div>
    </motion.div>
  );
};

const WhyGrid = ({ cards }) => {
  return (
    <section className="w-full py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-6xl md:text-7xl font-bold font-playfair text-black mb-6">Why We Started</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <WhyCard key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyGrid;