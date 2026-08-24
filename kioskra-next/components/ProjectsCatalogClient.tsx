"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Layers, ArrowUpRight, SlidersHorizontal, Maximize2, Calendar } from "lucide-react";
import { ProjectData } from "@/lib/projectsData";

interface ProjectsCatalogClientProps {
  projects: ProjectData[];
}

const CATEGORIES = ["All", "Custom Stalls", "Double Decker", "Turnkey Solutions", "3D Renders"] as const;

export default function ProjectsCatalogClient({ projects }: ProjectsCatalogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2.5 pt-4 pb-8 border-b border-brand-softStone">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-charcoal/60 mr-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-electricBlue" />
          <span>Category:</span>
        </div>
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-brand-deepBlack text-white shadow-md shadow-black/10 scale-[1.02]"
                  : "bg-white border border-brand-softStone text-brand-charcoal hover:border-brand-electricBlue hover:text-brand-electricBlue"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Grid of Projects */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={project.slug}
              className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-brand-softStone hover:border-brand-electricBlue/40 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-softStone">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Category Tag Overlay */}
                <span className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-widest text-brand-deepBlack border border-white shadow-sm">
                  {project.tag}
                </span>

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-brand-deepBlack/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-brand-deepBlack transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 className="w-4 h-4 text-brand-electricBlue" />
                  </div>
                </div>
              </div>

              {/* Metadata Section */}
              <div className="p-6 flex flex-col justify-between flex-grow gap-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold text-brand-electricBlue uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{project.venue.split(",")[0]}</span>
                    </div>
                    <span className="bg-brand-softStone/40 px-2 py-0.5 rounded text-[10px]">
                      {project.areaSize}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-brand-deepBlack leading-snug group-hover:text-brand-electricBlue transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-xs text-brand-charcoal/70 leading-relaxed line-clamp-2">
                    {project.challenge}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-softStone/60 flex items-center justify-between text-xs font-bold text-brand-charcoal/80">
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand-charcoal/40" />
                    <span>{project.client}</span>
                  </span>
                  
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-brand-electricBlue hover:text-blue-600 transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
