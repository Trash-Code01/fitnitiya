/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import FluidButton from '../../components/FluidButton';

const CTA = ({ heading, subheading, buttonText }) => {
  return (
    <section className="w-full py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
        <motion.h2 className="text-5xl md:text-6xl font-bold font-playfair text-black mb-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {heading}
        </motion.h2>
        <motion.p className="text-xl text-gray-600 mb-12 font-inter" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          {subheading}
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, type: 'spring' }}>
          <FluidButton href="/booking" text={buttonText} />
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;