import React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Image from "next/image";
import { CheckCircle2, Building2, User, Trophy, ShieldCheck, Mail } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us & Leadership | Kioskra Exhibitions",
  description: "Discover Kioskra's spatial design philosophy, our premium exhibition stall fabrication capabilities, and the leadership vision of Piyush Gupta & Sourav Sharma.",
  keywords: [
    "Kioskra directors",
    "Piyush Gupta",
    "Sourav Sharma",
    "exhibition designers Delhi",
    "stall fabrication specialists",
    "about Kioskra",
  ],
};

export default function AboutPage() {
  const stats = [
    { value: "150+", label: "Pavilions Delivered" },
    { value: "12+", label: "Global Trade Hubs" },
    { value: "99.4%", label: "On-Time Handover Rate" },
    { value: "100%", label: "Architectural Rigor" },
  ];

  const leadership = [
    {
      name: "Piyush Gupta",
      role: "Director of Design & Strategy",
      image: "/images/piyush_gupta.png",
      bio: "Piyush heads the architectural design and spatial strategy division at Kioskra. With a focus on modern structural aesthetics and visual merchandising, he transforms raw corporate briefs into striking, high-impact spatial statements.",
      specialty: "Parametric Design, Client Relations & Spatial Planning",
    },
    {
      name: "Sourav Sharma",
      role: "Director of Production & Project Delivery",
      image: "/images/sourav_sharma.png",
      bio: "Sourav oversees the workshop fabrication and execution phases. His extensive technical knowledge of metallurgy, timber craftsmanship, and structural safety ensure every pavilion is engineered flawlessly and handed over on time.",
      specialty: "On-ground logistics, structural engineering, safety compliance",
    },
  ];

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-brand-warmOffWhite pb-20">
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

      {/* 2-Column Philosophy & Narrative */}
      <Section className="pt-0 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-brand-electricBlue font-extrabold block">
              Design Philosophy
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-brand-deepBlack font-sans leading-tight">
              Inspired by structural honesty and premium minimalist aesthetics.
            </h3>
            <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed">
              Founded on the belief that exhibition architecture should merge structural poise with commercial impact, Kioskra designs, fabricates, and executes bespoke trade show stalls for visionary global enterprises.
            </p>
            <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed">
              From our pre-fabrication workshops in Delhi to high-stakes on-ground assembly in BKC Mumbai, Pragati Maidan, HITEX, and BIEC, every joint, luminaire, and surface is meticulously calibrated.
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

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-8 bg-brand-softStone/50 border border-brand-softStone shadow-inner space-y-6">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-brand-deepBlack to-brand-charcoal text-white p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-electricBlue/20 border border-brand-electricBlue/40 flex items-center justify-center text-brand-electricBlue">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-brand-electricBlue font-bold block pt-2">
                    Spatial Standard
                  </span>
                  <h4 className="text-xl font-bold font-sans">
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

      {/* Metrics / Key Stats */}
      <Section className="py-16 bg-white border-y border-brand-softStone/60">
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

      {/* Leadership Vision Section */}
      <Section className="py-20">
        <div className="space-y-12">
          {/* Section Title */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-brand-electricBlue font-extrabold block">
              Leadership Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-deepBlack">
              The Minds Behind <span className="font-serif-italic text-brand-electricBlue">Kioskra</span>
            </h2>
            <p className="text-sm text-brand-charcoal/70 leading-relaxed">
              Our directors combine creative spatial design with technical fabrication excellence to deliver stunning project handovers pan-India.
            </p>
          </div>

          {/* Leaders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {leadership.map((leader, idx) => (
              <div
                key={idx}
                className="group flex flex-col rounded-3xl bg-white border border-brand-softStone overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-electricBlue/35 transition-all duration-300"
              >
                {/* Photo Frame */}
                <div className="relative aspect-[4/5] w-full bg-brand-softStone overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-6 text-white">
                    <h3 className="text-xl font-bold">{leader.name}</h3>
                    <p className="text-xs text-brand-electricBlue font-semibold uppercase tracking-wider mt-0.5">
                      {leader.role}
                    </p>
                  </div>
                </div>

                {/* Bio Details */}
                <div className="p-8 space-y-4">
                  <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed">
                    {leader.bio}
                  </p>

                  <div className="pt-4 border-t border-brand-softStone/60 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-deepBlack">
                      <Trophy className="w-4 h-4 text-brand-electricBlue" />
                      <span>Focus: {leader.specialty}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-brand-charcoal/60">
                      <ShieldCheck className="w-4 h-4 text-brand-electricBlue" />
                      <span>Zero-compromise handover guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
