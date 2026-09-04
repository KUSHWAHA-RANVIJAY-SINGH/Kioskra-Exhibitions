"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock, Shield } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactSection() {

  return (
    <section id="contact" className="py-20 sm:py-28 bg-warm text-dark">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Information Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone text-dark text-[11px] font-bold uppercase tracking-widest w-fit border border-black/5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue inline-block" />
              Get In Touch
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-dark tracking-tight leading-tight">
              Start Your <span className="font-serif-italic text-accent-blue">Project</span> Inquiry
            </h2>

            <p className="text-sm text-dark/75 leading-relaxed font-medium">
              Fill out the form to request a free 3D design consultation and pricing quote for your upcoming exhibition stall anywhere in India.
            </p>

            {/* Direct Details Card */}
            <div className="p-8 rounded-3xl bg-dark text-white flex flex-col gap-6 shadow-xl border border-white/10 mt-2">
              <h3 className="text-xs uppercase tracking-widest text-accent-blue font-bold">
                Kioskra Headquarters
              </h3>

              {/* Clickable Map Integration */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
                {/* Base Map - Pointer events disabled so overlay gets the click */}
                <iframe
                  src="https://maps.google.com/maps?q=L2/86,+near+Nag+Mandir+Road,+Block+L+2,+Shastri+Nagar,+New+Delhi,+Delhi,+110052&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
                  href="https://maps.google.com/?q=L2/86,+near+Nag+Mandir+Road,+Block+L+2,+Shastri+Nagar,+New+Delhi,+Delhi,+110052" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span className="bg-neutral-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-4 py-2 rounded-full border border-white/20 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in Google Maps
                  </span>
                </a>
              </div>

              <div className="flex flex-col gap-4 text-xs text-white/80 font-medium">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                  <span>L2/86, near Nag Mandir Road, Block L 2, Shastri Nagar, New Delhi, Delhi, 110052</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent-blue flex-shrink-0" />
                  <a href="mailto:sales@kioskra.com" className="hover:text-accent-blue transition-colors">
                    sales@kioskra.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent-blue flex-shrink-0" />
                  <a href="tel:+919643378735" className="hover:text-accent-blue transition-colors">
                    +91 9643378735
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-accent-blue" />
                  24h Response
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-accent-blue" />
                  NDAs Respected
                </span>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone shadow-xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
