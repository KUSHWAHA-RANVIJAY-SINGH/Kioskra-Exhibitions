"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, ArrowUpRight, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Hide footer on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-charcoal text-white border-t border-white/10 pt-12 pb-8 relative overflow-hidden">
      {/* Editorial Decorative Background Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-electricBlue/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-10 relative z-10">
        
        {/* Compact Collaborative Header Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-accent-blue block mb-1">
              Start Your Design Journey
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans text-white">
              Ready to construct your brand's <span className="font-serif-italic text-accent-blue">ideal pavilion</span>?
            </h3>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-accent-blue hover:bg-blue-600 text-white font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-full transition-all shadow-md group self-start sm:self-auto"
          >
            <span>Request Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-white/10">
          
          {/* Brand Bio Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/LOGOS/Kioskra Transparent.png"
                alt="Kioskra Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="font-serif text-xl sm:text-2xl tracking-wide font-medium text-white">
                Kioskra Exhibitions
              </span>
            </div>
            <p className="text-[11px] text-white/70 leading-relaxed max-w-sm">
              Design-led exhibition stall fabrication and brand activation experts based in Delhi, executing premium turnkey booth solutions pan-India.
            </p>

            {/* Premium Social Media Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://www.instagram.com/kioskraexhibitions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-accent-blue hover:border-accent-blue transition-all duration-300 shadow-sm"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@KioskraExhibitions"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-accent-blue hover:border-accent-blue transition-all duration-300 shadow-sm"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/kioskra-exhibitions"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-accent-blue hover:border-accent-blue transition-all duration-300 shadow-sm"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-accent-blue">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2 text-[11px] text-white/70">
              <Link href="/projects" className="hover:text-white hover:translate-x-0.5 transition-all">
                Portfolio & Gallery
              </Link>
              <Link href="/about" className="hover:text-white hover:translate-x-0.5 transition-all">
                About Studio
              </Link>
              <Link href="/services" className="hover:text-white hover:translate-x-0.5 transition-all">
                Exhibition Services
              </Link>
              <Link href="/configurator" className="hover:text-white hover:translate-x-0.5 transition-all">
                3D Configurator
              </Link>
              <Link href="/blog" className="hover:text-white hover:translate-x-0.5 transition-all">
                Exhibition Blog
              </Link>
              <Link href="/contact" className="hover:text-white hover:translate-x-0.5 transition-all">
                Contact & Brief
              </Link>
            </nav>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-accent-blue">
              Capabilities
            </h4>
            <div className="flex flex-col gap-2 text-[11px] text-white/70">
              <span className="hover:text-white transition-colors cursor-default">Concept Stall Design</span>
              <span className="hover:text-white transition-colors cursor-default">3D Spatial Visualization</span>
              <span className="hover:text-white transition-colors cursor-default">Custom Stall Fabrication</span>
              <span className="hover:text-white transition-colors cursor-default">Turnkey Solutions</span>
              <span className="hover:text-white transition-colors cursor-default">RWA Brand Campaigns</span>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-accent-blue">
              Contact Us
            </h4>
            <div className="flex flex-col gap-2 text-[11px] text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent-blue flex-shrink-0 mt-0.5" />
                <span>L2/86, near Nag Mandir Road, Block L 2, Shastri Nagar, New Delhi, Delhi, 110052</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent-blue flex-shrink-0" />
                <a href="mailto:sales@kioskra.com" className="hover:text-white transition-colors">
                  sales@kioskra.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent-blue flex-shrink-0" />
                <a href="tel:+919643378735" className="hover:text-white transition-colors">
                  +91 9643378735
                </a>
              </div>
            </div>

            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-accent-blue hover:text-white transition-colors group"
              >
                <span>Request Free Quote</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/50">
          <p>© {currentYear} Kioskra Exhibitions – All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <span>DNOIN Minimalist Aesthetics</span>
            <span>•</span>
            <span>Pan-India Execution</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
