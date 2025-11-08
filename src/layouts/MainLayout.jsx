/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import Lenis from "lenis"; // ✅ fixed import
import { AnimatePresence, motion } from "framer-motion";

export default function MainLayout() {
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
    <div className="relative bg-white text-[#1E1E1E]">
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
