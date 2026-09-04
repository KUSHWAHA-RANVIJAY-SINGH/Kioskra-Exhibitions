"use client";

import React from "react";
import { CheckCircle2, Trophy } from "lucide-react";
import TrustedBrandsSection from "./TrustedBrandsSection";

const stats = [
  { value: "150+", label: "Projects Completed" },
  { value: "8+", label: "Years Experience" },
  { value: "50+", label: "Happy Clients" },
  { value: "15+", label: "Cities Covered" },
];

const highlights = [
  "Design-Led Exhibition Approach",
  "3D Visualization Before Fabrication",
  "Premium Materials & Finish",
  "On-Time Execution Guarantee",
  "Transparent Pricing, No Hidden Charges",
  "Delhi-Based, Pan-India Delivery",
];

export default function AboutSection() {
  return (
    <>
      <section id="about" className="py-20 sm:py-28 bg-warm text-dark">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-16">
          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Copy */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone text-dark text-[11px] font-bold uppercase tracking-widest w-fit border border-black/5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue inline-block" />
                About Kioskra Exhibitions
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-dark tracking-tight leading-tight">
                Building <span className="font-serif-italic text-accent-blue">Beyond</span> Exhibition Spaces
              </h2>

              <p className="text-base text-dark/80 leading-relaxed font-medium">
                <strong className="text-dark font-bold">Kioskra Exhibitions</strong> is a design-led exhibition and on-ground brand activation company based in Delhi, delivering end-to-end solutions for brands that want to stand out in physical spaces.
              </p>

              <p className="text-sm text-dark/70 leading-relaxed">
                We specialise in premium exhibition stall design, temporary brand structures, and experiential marketing executions that combine strong visual identity with flawless on-ground delivery. From concept and 3D design to fabrication, installation, and execution — we manage the entire process with precision, accountability, and attention to detail.
              </p>

              {/* Bullet Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-dark">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Stats Box */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone shadow-lg flex flex-col gap-6">
                <div className="flex items-center gap-2 text-accent-blue text-xs font-extrabold uppercase tracking-widest">
                  <Trophy className="w-4 h-4" />
                  <span>Our Track Record</span>
                </div>

                <div className="flex flex-col gap-6 divide-y divide-stone">
                  {stats.map((stat, idx) => (
                    <div key={idx} className={`${idx > 0 ? "pt-5" : ""} flex items-baseline justify-between`}>
                      <span className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
                        {stat.value}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-dark/60">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Trusted Brands Section */}
      <TrustedBrandsSection />
    </>
  );
}
