/* eslint-disable no-unused-vars */
// src/sections/home/FAQ.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosAdd, IoIosRemove } from "react-icons/io";

// --- 1. STATIC CONTENT SCHEMA ---
const faqContent = {
  heading: "Frequently Asked Questions",
  subheading: "Got questions? We've got answers. Here are the most common things people ask.",
  questions: [
    {
      question: "Will I gain fat or muscle?",
      answer: "Our program is designed for lean, sustainable muscle growth. We focus on a slight caloric surplus paired with progressive resistance training, which tells your body to build muscle, not just store fat."
    },
    {
      question: "I have a very fast metabolism. Will this still work?",
      answer: "Absolutely. This is our specialty. A 'fast metabolism' just means your body burns more calories at rest. We'll create a personalized nutrition blueprint that ensures you're eating *enough* of the *right* foods to fuel growth, without feeling overly stuffed."
    },
    {
      question: "Do I need a gym membership?",
      answer: "Nope! Our progressive workout plans are designed to be effective whether you're at home with minimal equipment or in a fully-equipped gym. We adapt the plan to what you have available."
    },
    {
      question: "How much 1:1 support do I actually get?",
      answer: "This is not a group program. You get direct, 1:1 access to your coach via text and weekly video check-ins. We are your personal partners in this journey, here to answer questions, adjust your plan, and keep you motivated."
    }
  ]
};

// --- 2. SUB-COMPONENT: Accordion Item ---
// This component manages the state for a single Q&A
const AccordionItem = ({ item, index, expanded, onToggle }) => {
  const isExpanded = index === expanded;

  return (
    <div className="border-b border-gray-200">
      {/* Question / Toggle Button */}
      <button
        onClick={() => onToggle(isExpanded ? false : index)} // Click to open, click again to close
        className="flex justify-between items-center w-full py-6 text-left"
      >
        <span className="text-lg md:text-xl font-semibold font-playfair text-black">
          {item.question}
        </span>
        <div className="text-2xl text-pink-400">
          {isExpanded ? <IoIosRemove /> : <IoIosAdd />}
        </div>
      </button>

      {/* Answer (Animated) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-700 font-inter leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// --- 3. MAIN COMPONENT ---
const FAQ = () => {
  const { heading, subheading, questions } = faqContent;
  
  // State to track the currently open accordion index (or false if none)
  const [expanded, setExpanded] = useState(false);

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

        {/* === ACCORDION === */}
        <div className="w-full max-w-3xl mx-auto">
          {questions.map((item, index) => (
            <AccordionItem 
              key={index}
              index={index}
              item={item}
              expanded={expanded}
              onToggle={setExpanded}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;