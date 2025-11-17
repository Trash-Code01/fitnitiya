/* eslint-disable no-unused-vars */
// src/components/Navbar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import FluidButton from './FluidButton';

// --- Navigation Links ---
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Me', path: '/about' },
  { name: 'Schedule', path: '/booking' },
  { name: 'Contact', path: '/contact' },
];

// --- Logo Animation Variants ---
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

const logoText = "Fitniya";

// --- Desktop NavLink Component ---
const NavLinkItem = ({ name, path }) => (
  <motion.li
    className="relative"
    whileHover="hover"
    initial="rest"
    variants={{
      rest: { y: 0 },
      hover: { y: -4 },
    }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <Link
      to={path}
      className="block text-black px-2 py-1 text-lg font-medium no-underline"
    >
      {name}
    </Link>
    <motion.div
      className="absolute left-0 bottom-[-4px] h-[2px] w-full bg-black"
      variants={{
        rest: { scaleX: 0, originX: 0.5 },
        hover: { scaleX: 1, originX: 0.5 },
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    />
  </motion.li>
);

// --- Mobile Menu Animation Variants ---
const mobileMenuVariant = {
  hidden: {
    opacity: 0,
    y: "-100%",
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

const mobileLinkVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// --- Main Navbar Component ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <header className="fixed top-0 left-0 w-full z-50 py-8 px-4 md:px-8 lg:px-16 bg-white shadow-sm">
        <div className="relative z-10 flex justify-between items-center max-w-7xl mx-auto">
          {/* === LEFT: Logo === */}
          <motion.div
            variants={logoContainerVariants}
            whileHover="hover"
          >
            <Link
              to="/"
              className="flex text-3xl font-bold text-black no-underline"
              aria-label="Fitniya Homepage"
              onClick={handleLinkClick}
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

          {/* === RIGHT: Desktop Links === */}
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLinkItem key={link.path} {...link} />
              ))}
              <li>
                <FluidButton href="/booking" text="Book a Call" />
              </li>
            </ul>
          </nav>

          {/* === RIGHT: Mobile Hamburger Button === */}
          <div className="md:hidden">
            <motion.button
              className="text-black text-4xl"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.8 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                  >
                    <HiOutlineX />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                  >
                    <HiOutlineMenuAlt3 />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* --- FULL-PAGE MOBILE MENU (Updated) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 bg-white flex flex-col 
                       items-start justify-center space-y-8 px-12" // <-- CHANGED
            variants={mobileMenuVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                variants={mobileLinkVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className="block text-black text-4xl font-semibold no-underline"
                  onClick={handleLinkClick}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              variants={mobileLinkVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 + navLinks.length * 0.1 }}
            >
              <FluidButton href="/booking" text="Book a Call" onClick={handleLinkClick} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;