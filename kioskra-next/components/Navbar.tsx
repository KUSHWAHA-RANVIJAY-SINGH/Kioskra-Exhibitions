"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [width, setWidth] = useState(1200);
  const pathname = usePathname();

  // Dynamic window width listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Scroll position listener for header state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation Links
  const navLinks = [
    { label: "Projects", href: "/projects" },
    { label: "About us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Configurator", href: "/configurator" },
    { label: "Contact", href: "/contact" },
  ];

  // Dynamic Theme State: dark background only applies at top of home page
  const isDarkBackground = pathname === "/" && !scrolled;

  // Responsive DNOIN White Scoop Dimension parameters (Sleeker & Compact)
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const hScoop = scrolled ? 48 : (isTablet ? 52 : 58); // height of center solid white scoop
  const r = isMobile ? 0 : (isTablet ? 32 : 44); // transition curve radius
  const wCenter = isMobile ? 0 : (isTablet ? 460 : 520); // center scoop flat bottom width

  // SVG Path Formulas
  const cx = width / 2;
  const x0 = cx - (wCenter / 2) - r;
  const x1 = cx - (wCenter / 2);
  const x2 = cx + (wCenter / 2);
  const x3 = cx + (wCenter / 2) + r;

  // Solid White Scoop Fill Path (Attached to top edge y=0)
  const scoopFillPathD = `
    M ${x0} 0
    C ${x0 + r / 2} 0, ${x1 - r / 2} ${hScoop}, ${x1} ${hScoop}
    L ${x2} ${hScoop}
    C ${x2 + r / 2} ${hScoop}, ${x3 - r / 2} 0, ${x3} 0
    Z
  `.replace(/\s+/g, " ").trim();

  // Scoop Outer Edge Stroke Path
  const scoopBorderPathD = `
    M ${x0} 0
    C ${x0 + r / 2} 0, ${x1 - r / 2} ${hScoop}, ${x1} ${hScoop}
    L ${x2} ${hScoop}
    C ${x2 + r / 2} ${hScoop}, ${x3 - r / 2} 0, ${x3} 0
  `.replace(/\s+/g, " ").trim();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Background Glass & Scoop Layer */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        
        {/* Side bar glass background (Active when scrolled or on subpages for 100% contrast) */}
        <div 
          className={`absolute inset-0 h-14 sm:h-16 transition-all duration-300 ${
            !isDarkBackground
              ? "bg-white/85 backdrop-blur-xl border-b border-black/10 shadow-sm"
              : "bg-transparent border-b border-transparent shadow-none"
          }`}
        />

        {/* Solid White Center Scoop SVG with soft architectural shadow */}
        {!isMobile && (
          <div className="absolute inset-0 filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.12)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)] pointer-events-none">
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Pure Solid White Fill for DNOIN Island */}
              <motion.path 
                d={scoopFillPathD} 
                fill="#ffffff"
                animate={{ d: scoopFillPathD }}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
              />

              {/* Subtle border stroke along scoop contour */}
              <motion.path 
                d={scoopBorderPathD}
                fill="none"
                stroke="rgba(0, 0, 0, 0.08)"
                strokeWidth="1"
                animate={{ d: scoopBorderPathD }}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
              />
            </svg>
          </div>
        )}
      </div>

      {/* Main Interactive Header Content Area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative pointer-events-auto">
        <div className="flex items-center justify-between relative h-14 sm:h-16">
          
          {/* Left: Brand Identity (Adaptive Text Color for 100% Contrast) */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className={`relative overflow-hidden w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isDarkBackground
                  ? "bg-white/10 border-white/20 group-hover:border-blue-400 backdrop-blur-md"
                  : "bg-black/5 border-black/15 group-hover:border-blue-600"
              }`}>
                <Image
                  src="/images/LOGOS/Kioskra Transparent.png"
                  alt="Kioskra Logo"
                  width={30}
                  height={30}
                  className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className={`font-extrabold tracking-widest text-lg font-sans transition-colors ${
                isDarkBackground
                  ? "text-white hover:text-blue-300 drop-shadow-md"
                  : "text-neutral-950 hover:text-blue-600"
              }`}>
                KIOSKRA
              </span>
            </Link>
          </div>

          {/* Center: DNOIN Solid White Scooped Navigation Container */}
          {!isMobile && (
            <motion.nav 
              className="hidden md:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 top-0"
              animate={{ height: hScoop }}
              style={{ width: wCenter }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all z-10 ${
                      isActive
                        ? "text-blue-600 font-extrabold"
                        : "text-neutral-800 hover:text-blue-600"
                    }`}
                  >
                    <span>{link.label}</span>
                    
                    {/* Active State Dot Indicator inside the white scoop */}
                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600 shadow-sm shadow-blue-600/50"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                  </Link>
                );
              })}
            </motion.nav>
          )}

          {/* Right: Action Area CTA Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/25 transition-all group"
            >
              <span>Get started</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${
                isDarkBackground ? "text-white hover:bg-white/10" : "text-neutral-950 hover:bg-black/5"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-3 max-w-7xl mx-auto px-4 pointer-events-auto"
          >
            <div className="bg-black/95 backdrop-blur-2xl text-white rounded-3xl p-6 shadow-2xl flex flex-col gap-5 border border-white/10">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-[11px] font-extrabold uppercase tracking-widest py-3 px-4 transition-all border-b-2 rounded-xl ${
                        isActive
                          ? "text-blue-400 border-blue-500 bg-white/5"
                          : "text-white/80 border-transparent hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="pt-3 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase py-3.5 rounded-2xl shadow-lg transition-colors"
                >
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
