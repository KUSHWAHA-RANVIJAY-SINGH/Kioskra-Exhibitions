import React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { CheckCircle2, Building2 } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { value: "150+", label: "Pavilions Delivered" },
    { value: "12+", label: "Global Trade Hubs" },
    { value: "99.4%", label: "On-Time Handover Rate" },
    { value: "100%", label: "Architectural Rigor" },
  ];

  return (
    <div className="pt-24 min-h-screen">
      {/* Header Banner */}
      <Section className="pb-8">
        <Heading
          badge="Our Spatial Ethos"
          sansPrefix="Architectural"
          serifAccent="Purity"
          sansSuffix="In Exhibition Spaces"
          subtitle="We re-imagine exhibition pavilions not as temporary booths, but as monolithic spatial installations that elevate brand prestige."
          size="xl"
        />
      </Section>

      {/* 2-Column Philosophy & Narrative Skeleton */}
      <Section className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-deepBlack font-sans">
              Inspired by the minimalism of DNOIN & modern structural honesty.
            </h3>
            <p className="text-base text-brand-charcoal/80 leading-relaxed">
              Founded on the belief that exhibition architecture should merge structural poise with commercial impact, KIOSKRA designs, fabricates, and executes bespoke trade show stalls for visionary global enterprises.
            </p>
            <p className="text-base text-brand-charcoal/80 leading-relaxed">
              From our pre-fabrication workshops to high-stakes on-ground assembly in Frankfurt, Dubai, Singapore, and New Delhi, every joint, luminaire, and surface is meticulously calibrated.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Turnkey Exhibition Management",
                "Precision In-House Fabrication",
                "Structural Engineering & Audits",
                "Sustainable Modular Lifecycle",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-brand-deepBlack">
                  <CheckCircle2 className="w-5 h-5 text-brand-electricBlue flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Button href="/contact" variant="primary" withArrow>
                Work With Our Architects
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Frame / Graphic Scaffold */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-8 bg-brand-softStone/50 border border-brand-softStone shadow-inner space-y-6">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-brand-deepBlack to-brand-charcoal text-white p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-electricBlue/20 border border-brand-electricBlue/40 flex items-center justify-center text-brand-electricBlue">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-brand-electricBlue font-bold block">
                    Spatial Standard
                  </span>
                  <h4 className="text-2xl font-bold font-sans">
                    Zero Compromise on Material & Light
                  </h4>
                </div>

                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-brand-softStone/80 leading-relaxed">
                  Every project is treated as an architectural statement — optimizing human traffic flow, acoustics, and tactile engagement.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Metrics / Key Stats Skeleton */}
      <Section className="bg-brand-softStone/30 border-y border-brand-softStone/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-3xl sm:text-5xl font-extrabold font-sans text-brand-electricBlue">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-charcoal/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
