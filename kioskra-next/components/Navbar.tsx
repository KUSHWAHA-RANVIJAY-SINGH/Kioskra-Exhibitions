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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = ["portfolio", "about", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: "-25% 0px -55% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [pathname]);

  const navLinks = [
    { label: "Projects", href: "/#portfolio" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/services" },
    { label: "Booth Configurator", href: "/configurator" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Premium Floating Glassmorphic Pill */}
        <motion.div
          layout
          className={`w-full flex items-center justify-between px-6 rounded-full transition-all duration-500 backdrop-blur-xl border ${
            scrolled
              ? "bg-black/90 border-white/15 shadow-2xl py-2.5"
              : "bg-black/75 border-white/10 shadow-lg py-3.5"
          } text-white`}
        >
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:border-accent-blue/50 transition-colors">
              <Image
                src="/images/LOGOS/Kioskra Transparent.png"
                alt="Kioskra Logo"
                width={30}
                height={30}
                className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="font-extrabold tracking-widest text-lg font-sans group-hover:text-accent-blue transition-colors">
              KIOSKRA
            </span>
          </Link>

          {/* Desktop Links with Animated Hover Pill */}
          <nav className="hidden md:flex flex-row items-center gap-1 relative">
            {navLinks.map((link, idx) => {
              const isActive = link.href.startsWith("/#")
                ? pathname === "/" && activeSection === link.href.substring(1)
                : pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="relative px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors z-10"
                >
                  <span className={isActive ? "text-accent-blue" : "text-white/80 hover:text-white"}>
                    {link.label}
                  </span>

                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-accent-blue rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Sliding Hover Pill Background */}
                  {hoveredIdx === idx && (
                    <motion.span
                      layoutId="hoverPill"
                      className="absolute inset-0 bg-white/5 border border-white/5 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Link & Mobile Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center justify-center gap-2 bg-accent-blue hover:bg-blue-600 text-white font-bold text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 group"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-3 max-w-7xl mx-auto px-2"
          >
            <div className="bg-black/95 backdrop-blur-2xl text-white rounded-3xl p-6 shadow-2xl flex flex-col gap-5 border border-white/10">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xs font-bold uppercase tracking-wider py-2.5 px-4 hover:bg-white/5 rounded-xl transition-all ${
                        isActive ? "text-accent-blue bg-white/5" : "text-white/80"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="pt-3 border-t border-white/10">
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-accent-blue hover:bg-blue-600 text-white font-bold text-xs uppercase py-3.5 rounded-2xl shadow-lg transition-colors"
                >
                  <span>Get in Touch</span>
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
