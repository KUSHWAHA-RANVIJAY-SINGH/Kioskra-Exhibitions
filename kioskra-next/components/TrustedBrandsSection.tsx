"use client";

import React from "react";
import Image from "next/image";

const clientLogos = [
  { src: "/images/LOGOS/Livguard.png", alt: "Livguard" },
  { src: "/images/LOGOS/Voltas.png", alt: "Voltas" },
  { src: "/images/LOGOS/okaya-power-seeklogo.png", alt: "Okaya Power" },
  { src: "/images/LOGOS/Milton.png", alt: "Milton" },
  { src: "/images/LOGOS/Treo.png", alt: "Treo" },
  { src: "/images/LOGOS/procook.png", alt: "ProCook" },
  { src: "/images/LOGOS/Prayag_Logo.png", alt: "Prayag" },
  { src: "/images/LOGOS/Servo.png", alt: "Servo" },
  { src: "/images/LOGOS/Federal.png", alt: "Federal" },
  { src: "/images/LOGOS/Livfast.png", alt: "Livfast" },
  { src: "/images/LOGOS/BOB card.png", alt: "BOBCARD" },
  { src: "/images/LOGOS/tulip Logo.png", alt: "Tulip Diagnostics" },
];

export default function TrustedBrandsSection() {
  return (
    <section className="w-full py-16 sm:py-20 bg-gradient-to-r from-blue-50/70 via-slate-50 to-indigo-50/80 border-t-4 border-accent-blue relative overflow-hidden shadow-inner">
      {/* Decorative Blur Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 flex flex-col gap-10">
        {/* Heading Treatment */}
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-accent-blue font-extrabold px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/60 shadow-sm w-fit">
            Proven Industry Excellence
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold sm:font-black text-dark tracking-tight leading-tight flex items-center justify-center gap-3 flex-wrap">
            <span className="inline-block animate-bounce text-3xl sm:text-4xl select-none">🏆</span>
            <span>TRUSTED BY LEADING BRANDS PAN-INDIA</span>
          </h2>
        </div>

        {/* Marquee Logo Container with Fade Masks */}
        <div className="relative overflow-hidden py-4 rounded-3xl">
          {/* Left & Right Fade Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent pointer-events-none" />

          {/* Continuous Marquee Track */}
          <div className="animate-marquee items-center gap-6 sm:gap-8">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, idx) => (
              <div
                key={idx}
                className="group flex-shrink-0 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-accent-blue/40 hover:-translate-y-1.5 hover:scale-105 transition-all duration-300 flex items-center justify-center h-20 sm:h-24 w-44 sm:w-56 cursor-pointer"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={70}
                  className="max-h-12 sm:max-h-14 w-auto object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
