"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { privateGalleryImages } from "@/lib/privateGalleryData";
import { Search, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

// Project Data Generator for the private gallery images
const PROJECT_TITLES = [
  "Treo Pavilion",
  "Prayag Bath Fittings",
  "Milton Appliance Stand",
  "CySecK Security Hub",
  "Apex Modular Platform",
  "Vanguard Tech Enclosure",
  "Zenith Smart Booth",
  "Optima Brand Experience",
  "Aura Spatial Pavilion",
  "Horizon Industrial Suite",
  "Velocity Power Systems",
  "Elysium Luxury Stand",
  "Nexus Digital Activation",
  "Spectra Lighting Arena",
  "Kioskra Master Pavilion",
  "Prism Glass Enclosure",
  "Quantum Energy Hub",
  "Starlight Double Decker",
  "Titan Heavy Machinery",
  "Echo Acoustic Pavilion",
];

const CATEGORIES = ["All", "Exhibition Stands", "Brand Activation", "Concepts"] as const;

type CategoryType = (typeof CATEGORIES)[number];

interface ProjectItem {
  id: number;
  src: string;
  title: string;
  projectNum: number;
  category: CategoryType;
  categoryTag: string;
  stallSize: string;
  venue: string;
}

export default function PortfolioShowcasePage() {
  const [activeFilter, setActiveFilter] = useState<CategoryType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Generate enriched project objects from private gallery images
  const projects = useMemo<ProjectItem[]>(() => {
    return privateGalleryImages.map((src, idx) => {
      // Assign category deterministically for filtering
      let category: Exclude<CategoryType, "All"> = "Exhibition Stands";
      if (idx % 3 === 1) category = "Brand Activation";
      if (idx % 3 === 2) category = "Concepts";

      const baseTitle = PROJECT_TITLES[idx % PROJECT_TITLES.length];
      const cycle = Math.floor(idx / PROJECT_TITLES.length);
      const title = cycle > 0 ? `${baseTitle} Phase ${cycle + 1}` : baseTitle;
      const projectNum = idx + 1;

      // Singular tag format for card overlay (e.g., EXHIBITION STAND)
      let categoryTag = "EXHIBITION STAND";
      if (category === "Brand Activation") categoryTag = "BRAND ACTIVATION";
      if (category === "Concepts") categoryTag = "CONCEPT PAVILION";

      return {
        id: idx,
        src,
        title,
        projectNum,
        category,
        categoryTag,
        stallSize: `${12 + (idx % 10) * 3}m x ${8 + (idx % 6) * 2}m`,
        venue: idx % 2 === 0 ? "Pragati Maidan, New Delhi" : "BIEC, Bengaluru",
      };
    });
  }, []);

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeFilter === "All" || project.category === activeFilter;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `#${project.projectNum}`.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeFilter, searchQuery]);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + filteredProjects.length) % filteredProjects.length
      );
    }
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredProjects.length);
    }
  };

  return (
    <div className="bg-[#F5F4F1] min-h-screen text-[#111111] pt-28 sm:pt-36 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── HEADER ─────────────────────────────────────────── */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-stone-300/80">
          <div className="max-w-2xl">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-3">
              Kioskra Architecture • Portfolio Archive
            </span>
            <h1 className="font-serif font-normal text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-[1.08]">
              Exhibition Stall Design Portfolio
            </h1>
          </div>
          <div className="max-w-md">
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              From compact kiosks to large-format exhibition environments, every
              project is built around the brand and the visitor journey.
            </p>
          </div>
        </header>

        {/* ── FILTER BAR ─────────────────────────────────────── */}
        <div className="mt-8 mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? "bg-[#111111] text-white shadow-md"
                      : "bg-white/80 hover:bg-white text-stone-700 border border-stone-300/80 hover:border-stone-400"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Minimal Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-300/80 rounded-full pl-9 pr-8 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 outline-none focus:border-stone-800 transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── PROJECT GRID ───────────────────────────────────── */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-stone-300/70 my-12 shadow-sm">
            <h3 className="text-xl font-bold font-serif mb-2 text-[#111111]">
              No matching projects found
            </h3>
            <p className="text-stone-500 text-sm mb-6">
              Try adjusting your search query or switching category filters.
            </p>
            <button
              onClick={() => {
                setActiveFilter("All");
                setSearchQuery("");
              }}
              className="bg-[#111111] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => openLightbox(idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── LIGHTBOX MODAL ──────────────────────────────────── */}
      {selectedImageIndex !== null && filteredProjects[selectedImageIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-3.5 rounded-full bg-white/10 text-white hover:bg-blue-600 border border-white/20 transition-colors"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Modal Image & Details */}
          <div
            className="relative max-w-5xl w-full max-h-[88vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh] rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl">
              <Image
                src={filteredProjects[selectedImageIndex].src}
                alt={filteredProjects[selectedImageIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Bottom Metadata */}
            <div className="mt-4 w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-2 text-white">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                  {filteredProjects[selectedImageIndex].categoryTag}
                </span>
                <h3 className="text-xl font-bold font-serif">
                  {filteredProjects[selectedImageIndex].title}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-300">
                <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  Size: {filteredProjects[selectedImageIndex].stallSize}
                </span>
                <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  Venue: {filteredProjects[selectedImageIndex].venue}
                </span>
                <span className="text-blue-400 font-mono font-bold bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                  {selectedImageIndex + 1} / {filteredProjects.length}
                </span>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-3.5 rounded-full bg-white/10 text-white hover:bg-blue-600 border border-white/20 transition-colors"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: ProjectItem;
  onOpen: () => void;
}) {
  return (
    <div
      onClick={onOpen}
      className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-stone-300/70 shadow-sm hover:shadow-2xl transition-all duration-300 bg-stone-200 cursor-pointer"
    >
      {/* Background Image */}
      <Image
        src={project.src}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />

      {/* Dark Gradient Overlay at Bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 text-white transition-opacity duration-300">
        {/* Upper Project Number Badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          #{project.projectNum}
        </div>

        {/* Content Overlay */}
        <div>
          <span className="block text-[10px] font-extrabold uppercase tracking-widest text-blue-400 mb-1">
            {project.categoryTag}
          </span>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide leading-tight mb-2 group-hover:text-blue-200 transition-colors">
            {project.title}
          </h3>

          {/* Bottom Bar: VIEW PROJECT ↗ and Carousel Dots */}
          <div className="flex items-center justify-between pt-2 border-t border-white/20 mt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-300 group-hover:text-white flex items-center gap-1 transition-colors">
              VIEW PROJECT <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>

            {/* Carousel Dot Indicators at bottom right */}
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-1 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white/70 transition-colors" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white/70 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
