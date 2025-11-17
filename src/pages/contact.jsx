/* eslint-disable no-unused-vars */
// src/pages/Contact.jsx

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { IoArrowForward, IoCheckmarkCircle } from 'react-icons/io5';

// --- 1. STATIC CONTENT SCHEMA ---
const contactContent = {
  heading: [
    "Let's Build",
    "Your Story"
  ],
  subheading: "Have a question or a project in mind? We're here to listen. Fill out the form, and we'll get back to you within 24 hours.",
  formspreeId: "YOUR_FORMSPREE_ID_HERE" // <-- IMPORTANT: Replace this!
};

// --- 2. SCROLL REVEAL TEXT SUB-COMPONENT ---
const ScrollRevealText = ({ textContent, activeIndex, className = "" }) => {
  let wordIndex = 0;
  return (
    <div>
      {textContent.map((line, lineIndex) => (
        <div key={lineIndex} className={`mb-2 ${className}`}>
          {line.split(' ').map((word, index) => {
            const currentWordIndex = wordIndex++;
            const isActive = currentWordIndex <= activeIndex;
            return (
              <span
                key={index}
                className={`word inline-block mr-4 font-bold font-playfair transition-colors duration-300 ease-in-out ${
                  isActive ? 'text-black' : 'text-gray-200'
                }`}
                style={{ lineHeight: '1.1' }}
              >
                {word}
              </span>
            );
          })}
        </div>
      ))}
      <style jsx>{`
        .word { font-size: 72px; }
        @media (max-width: 768px) { .word { font-size: 56px; } }
        @media (max-width: 480px) { .word { font-size: 44px; } }
      `}</style>
    </div>
  );
};

// --- 3. REUSABLE FORM INPUT (Logic Fixed) ---
const FormInput = ({ id, label, type = "text", as = "input", delay = 0 }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const InputComponent = as;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value !== "");
  };
  
  const showLabel = isFocused || hasValue;

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }} // Added delay
    >
      <motion.label
        htmlFor={id}
        className="absolute left-0 font-inter text-gray-500 pointer-events-none"
        animate={{
          y: showLabel ? -24 : 0,
          scale: showLabel ? 0.85 : 1,
          color: isFocused ? '#EC4899' : '#6B7280' // pink-500 or gray-500
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <InputComponent
        id={id}
        name={id}
        type={type}
        required
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full p-2 border-b-2 bg-transparent
                    font-inter text-black
                    focus:outline-none transition-all ${
                      isFocused ? 'border-pink-500' : 'border-gray-200'
                    }`}
        {...(as === 'textarea' && { rows: 4 })}
      />
    </motion.div>
  );
};

// --- 4. BUTTON ANIMATION VARIANTS ---
const buttonVariants = {
  rest: {
    backgroundColor: "#000000",
    color: "#ffffff",
    transition: { duration: 0.3 }
  },
  hover: {
    backgroundColor: "#EC4899", // Pink
    color: "#ffffff",
    scale: 1.05,
    transition: { duration: 0.3 }
  },
  tap: {
    scale: 0.95
  }
};

// --- 5. MAIN CONTACT PAGE COMPONENT ---
const Contact = () => {
  const { heading, subheading, formspreeId } = contactContent;

  const [activeIndex, setActiveIndex] = useState(-1);
  const headingContainerRef = useRef(null);
  const totalWords = useMemo(() => heading.join(' ').split(' ').length, [heading]);
  
  const [state, handleSubmit] = useForm(formspreeId);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex(totalWords - 1);
    }, 500);
    return () => clearTimeout(timer);
  }, [totalWords]);

  if (state.succeeded) {
    return (
      <section className="w-full min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <IoCheckmarkCircle className="text-8xl text-pink-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold font-playfair text-black">Thank You!</h1>
          <p className="text-lg text-gray-700 font-inter mt-4 max-w-md">
            Your message has been sent. We'll get back to you within 24 hours.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <main>
      <section className="w-full py-32 md:py-48 bg-gradient-to-b from-white to-[#FDF1F5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-4 md:px-8">
          
          {/* === 1. LEFT COLUMN (Heading) === */}
          <div ref={headingContainerRef}>
            <ScrollRevealText textContent={heading} activeIndex={activeIndex} />
            <motion.p
              className="text-lg text-gray-700 font-inter mt-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {subheading}
            </motion.p>
          </div>

          {/* === 2. RIGHT COLUMN (Form) === */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-12">
            <FormInput id="name" label="Full Name" delay={0.1} />
            <FormInput id="email" label="Email Address" type="email" delay={0.2} />
            <FormInput id="phone" label="Phone Number" type="tel" delay={0.3} /> {/* <-- ADDED */}
            <FormInput id="message" label="Your Message" as="textarea" delay={0.4} />
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <motion.button
                type="submit"
                disabled={state.submitting}
                className="flex items-center justify-center space-x-2 w-full md:w-auto
                           py-3 px-8 font-semibold 
                           rounded-full transition-all duration-300
                           disabled:bg-gray-400"
                // --- NEW ANIMATION ---
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <span>{state.submitting ? "Sending..." : "Send Message"}</span>
                {!state.submitting && <IoArrowForward />}
              </motion.button>
              {state.errors && (
                <p className="text-red-500 text-sm mt-4">
                  Something went wrong. Please try again.
                </p>
              )}
            </motion.div>
          </form>

        </div>
      </section>
    </main>
  );
};

export default Contact;