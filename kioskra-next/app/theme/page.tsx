import React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { Palette } from "lucide-react";

export default function ThemePage() {
  const brandColors = [
    {
      name: "Warm Off-White",
      token: "brand.warmOffWhite",
      cssVar: "--color-brand-warmOffWhite",
      hex: "#F5F4F1",
      textColor: "text-brand-deepBlack",
      bgClass: "bg-[#F5F4F1]",
      borderClass: "border-[#E9E8E4]",
      role: "Primary Canvas Background & Base Light Tone",
    },
    {
      name: "Soft Stone",
      token: "brand.softStone",
      cssVar: "--color-brand-softStone",
      hex: "#E9E8E4",
      textColor: "text-brand-deepBlack",
      bgClass: "bg-[#E9E8E4]",
      borderClass: "border-[#DCDAD5]",
      role: "Secondary Surface, Architectural Card Borders & Panels",
    },
    {
      name: "Deep Black",
      token: "brand.deepBlack",
      cssVar: "--color-brand-deepBlack",
      hex: "#111111",
      textColor: "text-white",
      bgClass: "bg-[#111111]",
      borderClass: "border-[#2A2A2A]",
      role: "Primary Headings, Monolithic Surfaces, High-Contrast Text",
    },
    {
      name: "Charcoal",
      token: "brand.charcoal",
      cssVar: "--color-brand-charcoal",
      hex: "#191A1A",
      textColor: "text-white",
      bgClass: "bg-[#191A1A]",
      borderClass: "border-[#333333]",
      role: "Subheadings, Body Paragraphs, Dark Glass Elements",
    },
    {
      name: "Electric Blue",
      token: "brand.electricBlue",
      cssVar: "--color-brand-electricBlue",
      hex: "#2F6BFF",
      textColor: "text-white",
      bgClass: "bg-[#2F6BFF]",
      borderClass: "border-[#2055DE]",
      role: "Primary Brand Accent, CTAs, Active States & Focus Highlights",
    },
    {
      name: "Light Accent",
      token: "brand.lightAccent",
      cssVar: "--color-brand-lightAccent",
      hex: "#F0F0F0",
      textColor: "text-brand-deepBlack",
      bgClass: "bg-[#F0F0F0]",
      borderClass: "border-[#E0E0E0]",
      role: "Subtle Fill Highlights, Tag Backgrounds, Skeleton Placeholders",
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-brand-warmOffWhite pb-24">
      {/* Theme Header */}
      <Section className="pb-8 border-b border-brand-softStone">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electricBlue/10 text-brand-electricBlue text-xs font-bold uppercase tracking-wider w-fit mb-4">
          <Palette className="w-3.5 h-3.5" />
          <span>Internal Design System Foundation</span>
        </div>
        <Heading
          sansPrefix="Brand Style &"
          serifAccent="Architectural"
          sansSuffix="Design Tokens"
          subtitle="A comprehensive visual matrix showcasing KIOSKRA's DNOIN-inspired minimalist palette, editorial typography combinations, and component states for Phase 1 client approval."
          size="xl"
        />
      </Section>

      {/* Section 1: Color Swatches */}
      <Section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-electricBlue text-white flex items-center justify-center font-mono font-bold text-xs">
            01
          </div>
          <div>
            <h3 className="text-2xl font-extrabold font-sans text-brand-deepBlack">
              Brand Color Palette
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal/70">
              Calibrated for spatial elegance, architectural contrast, and modern readability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandColors.map((c, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden bg-white border border-brand-softStone shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Color Block */}
              <div
                className={`h-36 w-full ${c.bgClass} flex flex-col justify-between p-4 border-b ${c.borderClass}`}
              >
                <span
                  className={`text-xs font-mono font-bold px-2 py-1 rounded backdrop-blur-md bg-black/10 ${c.textColor} w-fit`}
                >
                  {c.hex}
                </span>
                <span className={`text-sm font-bold ${c.textColor}`}>
                  {c.name}
                </span>
              </div>

              {/* Meta Info */}
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-brand-charcoal/60">
                  <span>Token:</span>
                  <span className="font-semibold text-brand-deepBlack">{c.token}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-brand-charcoal/60">
                  <span>Var:</span>
                  <span className="font-semibold text-brand-electricBlue">{c.cssVar}</span>
                </div>
                <p className="text-xs text-brand-charcoal/80 pt-2 border-t border-brand-softStone/60 leading-relaxed">
                  {c.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 2: Typography Samples */}
      <Section className="border-t border-brand-softStone bg-brand-softStone/20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-electricBlue text-white flex items-center justify-center font-mono font-bold text-xs">
            02
          </div>
          <div>
            <h3 className="text-2xl font-extrabold font-sans text-brand-deepBlack">
              Typography System: Sans + Serif Pairing
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal/70">
              Inter (Geometric Sans) alongside Playfair Display (Editorial Italic Serif).
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Headline Combinations */}
          <div className="p-8 rounded-3xl bg-white border border-brand-softStone shadow-sm space-y-6">
            <span className="text-xs font-mono text-brand-electricBlue font-bold uppercase tracking-wider block">
              Display Headings (Mixed Typography Pattern)
            </span>

            <div className="space-y-6">
              <div>
                <span className="text-xs text-brand-charcoal/50 font-mono block mb-1">
                  Hero H1 (64px - 96px)
                </span>
                <div className="text-4xl sm:text-6xl font-extrabold font-sans text-brand-deepBlack">
                  <span className="text-brand-electricBlue">Design-First </span>
                  <span className="font-serif italic font-normal text-brand-deepBlack">
                    Exhibition
                  </span>
                  <span> Solutions</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-brand-charcoal/50 font-mono block mb-1">
                  Section H2 (36px - 48px)
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-sans text-brand-deepBlack">
                  <span>Architectural </span>
                  <span className="font-serif italic font-normal text-brand-electricBlue">
                    Purity
                  </span>
                  <span> in Pavilions</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-brand-charcoal/50 font-mono block mb-1">
                  Card Title H3 (24px - 30px)
                </span>
                <div className="text-2xl font-bold font-sans text-brand-deepBlack">
                  Monolithic Modular Double Decker
                </div>
              </div>
            </div>
          </div>

          {/* Font Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inter Sans */}
            <div className="p-8 rounded-3xl bg-white border border-brand-softStone space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-brand-electricBlue uppercase">
                  Primary Sans Font
                </span>
                <span className="text-xs font-mono bg-brand-softStone px-2 py-0.5 rounded">
                  Inter (Google Font)
                </span>
              </div>
              <p className="font-sans text-3xl font-extrabold text-brand-deepBlack">
                Inter Sans 700 / 600 / 500 / 400
              </p>
              <p className="font-sans text-sm text-brand-charcoal leading-relaxed">
                Clean, geometric legibility for navigation, technical specifications, structural dimensions, and micro-copy.
              </p>
              <div className="font-mono text-xs text-brand-charcoal/60 pt-2 border-t border-brand-softStone">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz 0123456789
              </div>
            </div>

            {/* Playfair Serif */}
            <div className="p-8 rounded-3xl bg-white border border-brand-softStone space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-brand-electricBlue uppercase">
                  Editorial Accent Serif
                </span>
                <span className="text-xs font-mono bg-brand-softStone px-2 py-0.5 rounded">
                  Playfair Display (Google Font)
                </span>
              </div>
              <p className="font-serif italic text-3xl font-normal text-brand-deepBlack">
                Playfair Display Italic
              </p>
              <p className="font-serif text-sm text-brand-charcoal leading-relaxed">
                Evokes high-end architectural editorial publications, European salon sophistication, and curated artisanal quality.
              </p>
              <div className="font-serif italic text-xs text-brand-charcoal/60 pt-2 border-t border-brand-softStone">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz 0123456789
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 3: Button Styles & States */}
      <Section className="border-t border-brand-softStone">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-electricBlue text-white flex items-center justify-center font-mono font-bold text-xs">
            03
          </div>
          <div>
            <h3 className="text-2xl font-extrabold font-sans text-brand-deepBlack">
              Interactive Elements & Button Variants
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal/70">
              Hover, active, and focus behaviors engineered with micro-interactions.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-brand-softStone shadow-sm space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {/* Primary */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-brand-charcoal/60 uppercase block">
                Primary (Electric Blue)
              </span>
              <Button variant="primary" withArrow className="w-full">
                Primary Action
              </Button>
            </div>

            {/* Pill */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-brand-charcoal/60 uppercase block">
                Pill CTA
              </span>
              <Button variant="pill" withArrow className="w-full">
                Get Started →
              </Button>
            </div>

            {/* Secondary */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-brand-charcoal/60 uppercase block">
                Secondary Soft Stone
              </span>
              <Button variant="secondary" className="w-full">
                Explore Portfolio
              </Button>
            </div>

            {/* Dark */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-brand-charcoal/60 uppercase block">
                Deep Black Monolith
              </span>
              <Button variant="dark" withArrow className="w-full">
                Direct Inquiry
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 4: Component Previews */}
      <Section className="border-t border-brand-softStone bg-brand-softStone/30">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-electricBlue text-white flex items-center justify-center font-mono font-bold text-xs">
            04
          </div>
          <div>
            <h3 className="text-2xl font-extrabold font-sans text-brand-deepBlack">
              Glassmorphism & Architectural Containers
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal/70">
              Layered translucency with backdrop-blur for floating navbars and overlay cards.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Glass Card 1 */}
          <div className="p-8 rounded-3xl glass-panel shadow-sm space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-electricBlue font-bold block">
              .glass-panel
            </span>
            <h4 className="text-xl font-bold font-sans text-brand-deepBlack">
              Light Liquid Glass
            </h4>
            <p className="text-xs text-brand-charcoal/80 leading-relaxed">
              `backdrop-blur-md bg-white/45 border border-white/60`
            </p>
          </div>

          {/* Glass Card 2 */}
          <div className="p-8 rounded-full glass-pill shadow-sm flex items-center justify-between px-8">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-electricBlue" />
              <span className="font-bold font-sans text-sm">Floating Navbar Container</span>
            </div>
            <span className="text-xs font-mono text-brand-electricBlue font-bold">.glass-pill</span>
          </div>

          {/* Glass Card 3 */}
          <div className="p-8 rounded-3xl glass-dark text-white shadow-md space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-electricBlue font-bold block">
              .glass-dark
            </span>
            <h4 className="text-xl font-bold font-sans text-white">
              Monolithic Night Glass
            </h4>
            <p className="text-xs text-brand-softStone/70 leading-relaxed">
              `backdrop-blur-md bg-[#111111]/65 border border-white/10`
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
