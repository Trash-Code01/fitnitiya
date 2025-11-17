/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxImage = ({ src, alt, overlayText }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <motion.div ref={ref} className="relative w-full h-[450px] md:h-[600px] rounded-2xl overflow-hidden" style={{ opacity }}>
      <motion.img src={src} alt={alt} className="absolute w-full h-full object-cover" style={{ y, scale: 1.2 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      {overlayText && (
        <motion.div className="absolute bottom-8 left-8 text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <h3 className="text-3xl md:text-4xl font-bold font-playfair">{overlayText}</h3>
        </motion.div>
      )}
    </motion.div>
  );
};

const Founders = ({ niyati, yash }) => {
  return (
    <section className="w-full py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <ParallaxImage src={niyati.img} alt={niyati.name} overlayText={niyati.name} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <h3 className="text-pink-500 font-bold text-lg uppercase tracking-wider mb-3">{niyati.title}</h3>
            <h2 className="text-5xl md:text-6xl font-bold font-playfair text-black mb-6">{niyati.name}</h2>
            <p className="text-xl text-gray-700 leading-relaxed font-inter">{niyati.story}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div className="md:order-2" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <ParallaxImage src={yash.img} alt={yash.name} overlayText={yash.name} />
          </motion.div>
          <motion.div className="md:order-1" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <h3 className="text-pink-500 font-bold text-lg uppercase tracking-wider mb-3">{yash.title}</h3>
            <h2 className="text-5xl md:text-6xl font-bold font-playfair text-black mb-6">{yash.name}</h2>
            <p className="text-xl text-gray-700 leading-relaxed font-inter">{yash.story}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founders;