"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const sliderImages = [
  {
    src: "/images/hero_slider_2.png",
    alt: "Modern Double-Decker Exhibition Stall",
    caption: "Double-Decker Spatial Engineering",
  },
  {
    src: "/images/hero_slider_1.png",
    alt: "Minimalist Architectural Pavilion",
    caption: "Bespoke Exhibition Architecture",
  },
  {
    src: "/images/Designs/51.png",
    alt: "Futuristic 3D Spatial Pavilion",
    caption: "Turnkey Trade Show Fabrication",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#111111] overflow-hidden pt-20">
      {/* Hero Image Slider Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full bg-[#111111]"
          >
            <Image
              src={sliderImages[currentSlide].src}
              alt={sliderImages[currentSlide].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-50"
            />
          </motion.div>
        </AnimatePresence>

        {/* Contrast Gradients Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#191A1A]/30 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark z-10 pointer-events-none" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-8">
        {/* Architectural Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold tracking-wider backdrop-blur-md shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-accent-blue" />
          <span className="uppercase text-[11px] tracking-widest font-bold text-accent-blue">
            Premium Exhibition Partner
          </span>
          <span className="text-white/30">•</span>
          <span className="text-white/80 text-[11px]">Delhi • Pan-India</span>
        </motion.div>

        {/* Mixed Typography Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-snug lg:leading-tight max-w-4xl"
        >
          <span>Design-First </span>
          <span className="font-serif-italic text-accent-blue">Exhibition </span>
          <span>Solutions</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg text-white/75 font-normal max-w-2xl leading-relaxed"
        >
          Premium • Futuristic • Turnkey Stall Fabrication & Execution Across India
        </motion.p>

        {/* Floating Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2"
        >
          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent-blue text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/25 group"
          >
            <span>Explore Portfolio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/configurator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/20 backdrop-blur-md transition-all"
          >
            <span>Launch 3D Configurator</span>
          </Link>
        </motion.div>

        {/* Slider Controls & Indicators */}
        <div className="flex items-center gap-6 pt-4 z-30">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx
                    ? "w-8 bg-accent-blue"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Caption */}
        <span className="text-[11px] font-bold uppercase tracking-widest text-white/50 -mt-2">
          {sliderImages[currentSlide].caption}
        </span>
      </div>

      {/* Scroll Down Indicator */}
      <Link
        href="/#portfolio"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors z-20"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </Link>
    </section>
  );
}
