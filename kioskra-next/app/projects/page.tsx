import React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import { Box, SlidersHorizontal } from "lucide-react";

export default function ProjectsPage() {
  const filterPills = [
    "All Exhibitions",
    "Double Decker",
    "Modular Pavilions",
    "Tech & Mobility",
    "Pharma & Medical",
    "Industrial Engineering",
  ];

  const placeholderCards = Array.from({ length: 6 });

  return (
    <div className="pt-24 min-h-screen">
      {/* Header Banner */}
      <Section className="pb-8">
        <Heading
          badge="Exhibition Architecture Portfolio"
          sansPrefix="Selected"
          serifAccent="Spatial"
          sansSuffix="Commissions"
          subtitle="Explore our curated portfolio of bespoke exhibition pavilions, monolithic stands, and modular trade fair structures."
          size="xl"
        />

        {/* Filter Pills Skeleton */}
        <div className="flex flex-wrap items-center gap-2.5 pt-4 pb-8 border-b border-brand-softStone">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-charcoal/60 mr-2">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter:</span>
          </div>
          {filterPills.map((filter, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                idx === 0
                  ? "bg-brand-deepBlack text-white shadow-sm"
                  : "bg-white/80 border border-brand-softStone text-brand-charcoal hover:border-brand-electricBlue hover:text-brand-electricBlue"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </Section>

      {/* Grid Skeleton */}
      <Section className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {placeholderCards.map((_, idx) => (
            <div
              key={idx}
              className="group flex flex-col rounded-2xl overflow-hidden bg-brand-softStone/30 border border-brand-softStone hover:border-brand-electricBlue/40 transition-all duration-300 hover:shadow-lg"
            >
              {/* Skeleton Image Area */}
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-brand-softStone to-brand-lightAccent flex flex-col items-center justify-center relative p-6">
                <Box className="w-12 h-12 text-brand-charcoal/20 mb-2" />
                <span className="text-xs text-brand-charcoal/40 font-mono">
                  [ Project Asset Placeholder #{idx + 1} ]
                </span>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-xs font-semibold text-brand-deepBlack border border-white/60">
                  Concept {2024 + (idx % 2)}
                </span>
              </div>

              {/* Skeleton Metadata */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-brand-electricBlue font-bold uppercase tracking-wider">
                  <span>Trade Fair / Venue</span>
                  <span>{100 + idx * 25} sqm</span>
                </div>
                <h3 className="text-lg font-bold text-brand-deepBlack group-hover:text-brand-electricBlue transition-colors">
                  Exhibition Pavilion Alpha {idx + 1}
                </h3>
                <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                  Structural steel framework with acoustic fabric ceilings and integrated directional LED architectural illumination.
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
