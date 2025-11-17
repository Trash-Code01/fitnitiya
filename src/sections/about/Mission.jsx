/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import useTypewriter from '../../hooks/Typewriter.js';

const Mission = ({ mission }) => {
  const typedText = useTypewriter(mission.content, 25);
  const target = Number(String(mission.bigNumber || '0').replace(/,/g, '')) || 10000;
  return (
    <section className="relative w-full py-40 bg-gradient-to-b from-pink-50 via-white to-white text-black overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 text-center">
        <motion.h2 className="text-5xl md:text-6xl font-bold font-playfair mb-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          Our Mission
        </motion.h2>
        <motion.div className="text-7xl md:text-8xl font-bold font-playfair mb-2 text-pink-500" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
          <CountUp end={target} duration={2.5} separator="," />
        </motion.div>
        <motion.h3 className="text-2xl md:text-3xl font-bold font-playfair mb-8 text-gray-800" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
          {mission.headline}
        </motion.h3>
        <motion.p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-12 font-inter text-gray-700 min-h-[140px]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
          {typedText}
        </motion.p>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
          {mission.features.map((feature, i) => (
            <motion.div key={i} className="bg-white shadow-sm p-6 rounded-xl border border-pink-100" whileHover={{ scale: 1.03 }}>
              <p className="font-semibold text-lg text-gray-800">{feature}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;