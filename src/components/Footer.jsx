/* eslint-disable no-unused-vars */
// src/components/Footer.jsx

import React, { useState, useEffect } from 'react'; // <-- No more 'useRef' or 'useInView'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoLogoInstagram, IoLogoYoutube, IoLogoLinkedin } from 'react-icons/io5';
// We no longer need 'react-intersection-observer' for this

// --- 1. STATIC CONTENT SCHEMA ---
const footerContent = {
  tagline: "Stop waiting for 'someday'. Your strongest, most confident self is ready to be built.",
  agencyMark: "Developed by Devacia",
  navLinks: [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Schedule', path: '/booking' },
    { name: 'Contact', path: '/contact' },
  ],
  socialLinks: [
    { icon: IoLogoInstagram, href: '#' },
    { icon: IoLogoYoutube, href: '#' },
    { icon: IoLogoLinkedin, href: '#' },
  ],
  legalLinks: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ],
  copyright: `© ${new Date().getFullYear()} Fitniya. All rights reserved.`,
  disclaimer: "Results vary based on individual effort, metabolic rate, and commitment. We provide a proven framework and 1:1 coaching, not a magic solution."
};

// --- 2. LOGO ANIMATION (from Navbar) ---
const logoText = "Fitniya";
const logoContainerVariants = {
  hover: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};
const logoLetterVariants = {
  hover: {
    y: -3,
    scale: 1.1,
    transition: { type: 'spring', stiffness: 400, damping: 10 },
  },
};

// --- 3. MICRO-INTERACTION SUB-COMPONENTS ---
const FooterLink = ({ href, text }) => (
  <motion.div whileHover={{ y: -2 }}>
    <Link 
      to={href} 
      className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
    >
      {text}
    </Link>
  </motion.div>
);

const SocialIcon = ({ href, icon: Icon }) => (
  <motion.a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    whileHover={{ scale: 1.2, rotate: 5, color: '#EC4899' }}
    className="text-gray-500 text-2xl"
  >
    <Icon />
  </motion.a>
);

// --- 4. TYPEWRITER SUB-COMPONENT (Simplified) ---
const AgencyMark = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  // This simple useEffect will run once when the footer loads.
  // No complex "inView" logic needed.
  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 100); // Typing speed

    return () => clearInterval(intervalId);
  }, [text]); // Only run once when 'text' is set

  return (
    <p className="text-sm font-inter text-gray-500 h-6"> {/* h-6 to prevent layout shift */}
      {displayedText}
      {/* Blinking cursor that stops when done */}
      {displayedText.length < text.length && (
        <span className="inline-block w-[2px] h-4 bg-gray-500 ml-1 animate-ping"></span>
      )}
    </p>
  );
};

// --- 5. MAIN FOOTER COMPONENT ---
const Footer = () => {
  const { 
    tagline, 
    agencyMark,
    navLinks, 
    socialLinks, 
    legalLinks, 
    copyright, 
    disclaimer 
  } = footerContent;
  
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* === Top: Logo & Tagline === */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            variants={logoContainerVariants}
            whileHover="hover"
          >
            <Link
              to="/"
              className="flex text-4xl font-bold text-black no-underline font-playfair"
              aria-label="Fitniya Homepage"
            >
              {logoText.split('').map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  variants={logoLetterVariants}
                  className="cursor-pointer"
                >
                  {char}
                </motion.span>
              ))}
            </Link>
          </motion.div>
          <p className="text-lg text-gray-700 font-inter mt-4 max-w-md">
            {tagline}
          </p>
        </div>

        {/* === Middle: Nav & Socials === */}
        <hr className="border-gray-100" />
        <div className="flex flex-col md:flex-row justify-between items-center py-8">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-medium">
            {navLinks.map(link => (
              <FooterLink key={link.name} href={link.path} text={link.name} />
            ))}
          </nav>
          <div className="flex space-x-6 mt-6 md:mt-0">
            {socialLinks.map((link, index) => (
              <SocialIcon key={index} href={link.href} icon={link.icon} />
            ))}
          </div>
        </div>

        {/* === Bottom: Legal & Copyright === */}
        <hr className="border-gray-100" />
        <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 text-gray-500 font-inter text-sm">
          <p className="mt-4 md:mt-0">{copyright}</p>
          
          <div className="mb-4 md:mb-0">
            <AgencyMark text={agencyMark} />
          </div>
          
          <div className="flex space-x-4">
            {legalLinks.map(link => (
              <FooterLink key={link.name} href={link.path} text={link.name} />
            ))}
          </div>
        </div>
        
        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center mt-12 max-w-2xl mx-auto">
          {disclaimer}
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;