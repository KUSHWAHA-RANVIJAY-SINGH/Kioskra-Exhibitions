"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, ArrowUpRight, Layers } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  category: "Custom Stalls" | "Double Decker" | "Turnkey Solutions" | "3D Renders";
  clientName: string;
  location: string;
  image: string;
  tag: string;
}

const projectsData: Project[] = [
  {
    id: "1",
    title: "Okaya Power Tech Pavilion",
    category: "3D Renders",
    clientName: "Okaya Power",
    location: "Pragati Maidan, New Delhi",
    image: "/images/Designs/1 (1).png",
    tag: "3D Render",
  },
  {
    id: "2",
    title: "Milton Corporate Appliance Stall",
    category: "Custom Stalls",
    clientName: "Milton Appliances",
    location: "BKC Exhibition Centre, Mumbai",
    image: "/images/Delivered/1 (2).jpeg",
    tag: "Custom Stall",
  },
  {
    id: "3",
    title: "Voltas Smart Living Pavilion",
    category: "Double Decker",
    clientName: "Voltas",
    location: "IICC Dwarka, New Delhi",
    image: "/images/Designs/1 (2).png",
    tag: "Double Decker",
  },
  {
    id: "4",
    title: "Livguard Energy Storage Arena",
    category: "Turnkey Solutions",
    clientName: "Livguard",
    location: "HITEX, Hyderabad",
    image: "/images/Designs/51.png",
    tag: "Turnkey Solution",
  },
  {
    id: "5",
    title: "ProCook Culinary Experience Zone",
    category: "Custom Stalls",
    clientName: "ProCook",
    location: "BIEC, Bengaluru",
    image: "/images/Designs/53.png",
    tag: "Custom Stall",
  },
  {
    id: "6",
    title: "Prayag Bath Fittings Pavilion",
    category: "Double Decker",
    clientName: "Prayag",
    location: "Auto Expo, Greater Noida",
    image: "/images/Designs/52.png",
    tag: "Double Decker",
  },
  {
    id: "7",
    title: "Federal Bank Trade Show Booth",
    category: "Turnkey Solutions",
    clientName: "Federal Bank",
    location: "Pragati Maidan, New Delhi",
    image: "/images/Delivered/1 (1).jpeg",
    tag: "Turnkey Solution",
  },
  {
    id: "8",
    title: "Treo Premium Glassware Stall",
    category: "Custom Stalls",
    clientName: "Treo",
    location: "Jio World Convention Centre, Mumbai",
    image: "/images/Delivered/1 (6).jpeg",
    tag: "Custom Stall",
  },
  {
    id: "9",
    title: "Servo High-Performance Lubricants",
    category: "Turnkey Solutions",
    clientName: "Servo",
    location: "Pragati Maidan, New Delhi",
    image: "/images/Delivered/1 (7).jpeg",
    tag: "Turnkey Solution",
  },
];

const categories = ["All", "Custom Stalls", "Double Decker", "Turnkey Solutions"] as const;

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredProjects =
    activeTab === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeTab);

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-white text-dark border-t border-stone">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm text-dark text-[11px] font-bold uppercase tracking-widest w-fit border border-stone">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue inline-block" />
              Selected Portfolio
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-dark tracking-tight leading-tight">
              Architectural <span className="font-serif-italic text-accent-blue">Showcase</span>
            </h2>
          </div>
          <p className="text-sm text-dark/70 max-w-md leading-relaxed font-medium">
            Explore our curated exhibition stall builds, custom fabrications, and 3D architectural renders for top corporate brands across India.
          </p>
        </div>

        {/* Category Jump Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-stone">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-dark text-white shadow-md"
                    : "bg-warm text-dark/70 hover:bg-stone hover:text-dark"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-3xl overflow-hidden bg-warm border border-stone hover:border-accent-blue/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              {/* Card Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-stone">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/90 text-[10px] font-extrabold uppercase tracking-wider text-dark border border-white shadow-sm">
                  {project.tag}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-accent-blue uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-dark group-hover:text-accent-blue transition-colors leading-snug">
                    {project.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-stone flex items-center justify-between text-xs font-bold text-dark/70">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-dark/40" />
                    {project.clientName}
                  </span>
                  <span className="inline-flex items-center gap-1 text-accent-blue transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 group-hover:translate-x-1">
                    Explore
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
