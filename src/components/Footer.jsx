export default function Footer() {
  return (
    <footer className="w-full border-t border-[#FADADD]/60 bg-gradient-to-b from-[#FFF9FB] to-white text-center py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Brand Name */}
        <h2 className="text-xl font-semibold text-[#F77DAE] tracking-tight mb-2">
          Fitniya<span className="text-[#93C5B7]">.</span>
        </h2>

        {/* Tagline */}
        <p className="text-sm text-[#5C5C5C] mb-6">
          Helping women gain confidence, strength, and self-love — one journey at a time.
        </p>

        {/* Links */}
        <div className="flex justify-center gap-6 text-[15px] font-medium text-[#5C5C5C] mb-6">
          <a href="/terms" className="hover:text-[#F77DAE] transition-all duration-300">
            Terms
          </a>
          <a href="/privacy" className="hover:text-[#F77DAE] transition-all duration-300">
            Privacy
          </a>
          <a href="/contact" className="hover:text-[#F77DAE] transition-all duration-300">
            Contact
          </a>
        </div>

        {/* Divider Line */}
        <div className="h-[1px] w-full bg-[#FADADD]/50 mb-4"></div>

        {/* Bottom Note */}
        <p className="text-xs text-[#9A9A9A]">
          © {new Date().getFullYear()} <span className="text-[#F77DAE] font-semibold">Fitniya</span>.  
          All rights reserved. Designed with 💖 for women, by women.
        </p>
      </div>
    </footer>
  );
}
