/* eslint-disable no-unused-vars */
// src/layouts/MainLayout.jsx

import { Outlet, useLocation } from "react-router-dom"; // Added useLocation
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";

export default function MainLayout() {
  const location = useLocation(); // Hook to get current route

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    // --- FIXED: Added 'w-full' and 'overflow-x-hidden' ---
    <div className="relative bg-white text-[#1E1E1E] w-full overflow-x-hidden">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pt-20 min-h-screen"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}