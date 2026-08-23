"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Palette, Box, Truck, CheckCircle2 } from "lucide-react";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: ProcessStep[] = [
  {
    step: "01",
    title: "Requirements & Brief",
    description:
      "We start with understanding your brand, objectives, booth size, and exhibition timeline in detail.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Concept & 3D Designing",
    description:
      "Our designers create multiple 3D concepts with realistic renders for your approval and visualization.",
    icon: Palette,
  },
  {
    step: "03",
    title: "Design Finalization",
    description:
      "Based on your feedback, we finalize the design with material selections, lighting plans, and branding layouts.",
    icon: Box,
  },
  {
    step: "04",
    title: "Fabrication & Logistics",
    description:
      "In-house fabrication with premium materials, followed by safe logistics and transportation to the venue.",
    icon: Truck,
  },
  {
    step: "05",
    title: "On-Site Execution",
    description:
      "Our team handles complete installation, electrical setup, branding, and final QC before handover.",
    icon: CheckCircle2,
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 sm:py-28 bg-dark text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-accent-blue text-[11px] font-bold uppercase tracking-widest border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue inline-block animate-pulse" />
            Execution Methodology
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Our <span className="font-serif-italic text-accent-blue">5-Step</span> Process
          </h2>
          <p className="text-sm text-white/70 font-normal leading-relaxed">
            From initial brief to final on-site handover, we enforce rigorous quality controls at every phase.
          </p>
        </motion.div>

        {/* 5-Column Grid Process Cards with Stagger Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-charcoal rounded-3xl p-6 border border-white/10 flex flex-col justify-between gap-6 hover:border-accent-blue/50 transition-all duration-300 shadow-xl group"
              >
                <div className="flex flex-col gap-4">
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold font-serif-italic text-accent-blue">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-extrabold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="pt-3 border-t border-white/10 text-[10px] font-bold uppercase tracking-widest text-accent-blue">
                  Step {item.step}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
