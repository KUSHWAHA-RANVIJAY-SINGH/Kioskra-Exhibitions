"use client";

import React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Header Banner */}
      <Section className="pb-8">
        <Heading
          badge="Direct Commission & Inquiries"
          sansPrefix="Initiate Your"
          serifAccent="Spatial"
          sansSuffix="Project"
          subtitle="Partner with KIOSKRA for your upcoming exhibition stall, pavilion architecture, or international trade fair presence."
          size="xl"
        />
      </Section>

      {/* 2-Column Contact & Form Scaffold */}
      <Section className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Studio Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-brand-deepBlack text-brand-warmOffWhite space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-brand-electricBlue font-bold block">
                  Studio Headquarters
                </span>
                <h3 className="text-2xl font-bold font-sans text-white">
                  KIOSKRA Spatial Architecture
                </h3>
              </div>

              <div className="space-y-4 pt-2 text-sm text-brand-softStone/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-electricBlue flex-shrink-0 mt-0.5" />
                  <span>
                    Global Exhibition Services & Fabrication Units (India, UAE, Germany)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-electricBlue flex-shrink-0" />
                  <span>inquiries@kioskra.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-electricBlue flex-shrink-0" />
                  <span>+91 (0) 98765 43210</span>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-charcoal space-y-3">
                <div className="flex items-center gap-2 text-xs text-brand-softStone/60">
                  <Clock className="w-4 h-4 text-brand-electricBlue" />
                  <span>Initial architectural review within 24 business hours.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-softStone/60">
                  <ShieldCheck className="w-4 h-4 text-brand-electricBlue" />
                  <span>Non-Disclosure & Confidentiality Assured.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Spatial Inquiry Form Skeleton */}
          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-md border border-brand-softStone shadow-sm space-y-6"
            >
              <h3 className="text-xl font-bold text-brand-deepBlack font-sans mb-2">
                Spatial Brief & Project Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Eleanor Vance"
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-brand-warmOffWhite/60 border border-brand-softStone text-brand-deepBlack text-sm focus:outline-none focus:border-brand-electricBlue transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. eleanor@company.com"
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-brand-warmOffWhite/60 border border-brand-softStone text-brand-deepBlack text-sm focus:outline-none focus:border-brand-electricBlue transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                    Organization / Brand *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Aerospace"
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-brand-warmOffWhite/60 border border-brand-softStone text-brand-deepBlack text-sm focus:outline-none focus:border-brand-electricBlue transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                    Exhibition / Venue *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hannover Messe 2025"
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-brand-warmOffWhite/60 border border-brand-softStone text-brand-deepBlack text-sm focus:outline-none focus:border-brand-electricBlue transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                  Estimated Stall Size & Format
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["36 - 60 sqm", "60 - 120 sqm", "120 - 250 sqm", "Double Decker / 250+"].map(
                    (size, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-center p-3 rounded-xl border border-brand-softStone bg-brand-warmOffWhite/40 text-xs font-semibold text-brand-charcoal cursor-pointer hover:border-brand-electricBlue transition-all text-center"
                      >
                        <input
                          type="radio"
                          name="stallSize"
                          value={size}
                          defaultChecked={idx === 0}
                          suppressHydrationWarning
                          className="hidden"
                        />
                        <span>{size}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                  Project Notes & Brief Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Outline your booth dimensions, design goals, target completion date, or specific brand materials..."
                  suppressHydrationWarning
                  className="w-full px-4 py-3 rounded-xl bg-brand-warmOffWhite/60 border border-brand-softStone text-brand-deepBlack text-sm focus:outline-none focus:border-brand-electricBlue transition-colors"
                />
              </div>

              <div className="pt-2">
                <Button type="button" variant="primary" size="lg" withArrow className="w-full">
                  Submit Project Brief
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
}
