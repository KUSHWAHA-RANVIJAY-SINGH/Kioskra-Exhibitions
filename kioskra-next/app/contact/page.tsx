import React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Project Inquiries | Kioskra Exhibitions",
  description: "Partner with Kioskra for your upcoming exhibition stall, double-decker pavilion, or target brand campaign. Contact us to start your project brief.",
  keywords: [
    "contact Kioskra",
    "exhibition quote India",
    "booth design brief",
    "exhibition contractor phone",
    "hire stall designer",
  ],
};

export default function ContactPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen pb-20">
      {/* Header Banner */}
      <Section className="pb-8">
        <Heading
          badge="Direct Commission & Inquiries"
          sansPrefix="Initiate Your"
          serifAccent="Spatial"
          sansSuffix="Project"
          subtitle="Partner with Kioskra for your upcoming exhibition stall, pavilion architecture, or international trade fair presence."
          size="xl"
        />
      </Section>

      {/* 2-Column Contact & Form Scaffold */}
      <Section className="pt-0 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Studio Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-brand-deepBlack text-brand-warmOffWhite space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-brand-electricBlue font-bold block">
                  Studio Headquarters
                </span>
                <h3 className="text-2xl font-bold font-sans text-white">
                  Kioskra Spatial Architecture
                </h3>
              </div>

              {/* Clickable Map Integration */}
              <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
                {/* Base Map - Pointer events disabled so overlay gets the click */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14002.868735235882!2d77.1645065487771!3d28.66820546687002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03b0d2d38dfd%3A0xc3f1737e6f6630f9!2sShastri+Nagar%2C+Delhi%2C+110052!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="opacity-95 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                ></iframe>
                
                {/* Clickable Overlay Link */}
                <a 
                  href="https://maps.google.com/?q=L2/86,+Shastri+Nagar,+New+Delhi+%E2%80%93+110052" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span className="bg-neutral-900/80 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-brand-electricBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in Google Maps
                  </span>
                </a>
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
                  <a href="mailto:inquiries@kioskra.com" className="hover:text-white transition-colors">
                    inquiries@kioskra.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-electricBlue flex-shrink-0" />
                  <a href="tel:+919643378735" className="hover:text-white transition-colors">
                    +91 96433 78735
                  </a>
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

          {/* Right Column: Spatial Inquiry Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-brand-softStone shadow-sm">
            <ContactForm />
          </div>
        </div>
      </Section>
    </div>
  );
}
