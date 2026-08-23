import React from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Full-Bleed Video Hero */}
      <HeroSection />

      {/* 2. Redesigned Editorial About Us */}
      <AboutSection />

      {/* 3. Project Portfolio Grid with Dynamic Tabs */}
      <PortfolioSection />

      {/* 4. Process Timeline */}
      <ProcessSection />

      {/* 5. High-Converting Inquiry & Lead Form */}
      <ContactSection />
    </div>
  );
}
