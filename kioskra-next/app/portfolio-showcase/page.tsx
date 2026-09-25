"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Search, X, ChevronLeft, ChevronRight, ArrowUpRight, Phone, MessageCircle } from "lucide-react";
import { showcaseProjects, ShowcaseProject } from "@/lib/portfolioShowcaseData";

type CategoryFilter = "all" | "exhibition" | "activation" | "concept";

export default function PortfolioShowcasePage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProject, setActiveModalProject] = useState<ShowcaseProject | null>(null);
  const [modalActiveImgIndex, setModalActiveImgIndex] = useState(0);

  // Hero carousel state
  const featuredProjects = useMemo(() => showcaseProjects.slice(0, 8), []);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // Hero carousel auto play
  useEffect(() => {
    if (isHeroHovered) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isHeroHovered, featuredProjects.length]);

  const nextHero = useCallback(() => {
    setHeroIndex((prev) => (prev + 1) % featuredProjects.length);
  }, [featuredProjects.length]);

  const prevHero = useCallback(() => {
    setHeroIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  }, [featuredProjects.length]);

  // Filter projects logic
  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return showcaseProjects.filter((p) => {
      const matchesCategory = activeFilter === "all" || p.category === activeFilter;
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.categoryTag.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Modal open & keydown handling
  const openModal = (project: ShowcaseProject) => {
    setActiveModalProject(project);
    setModalActiveImgIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModalProject(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-[#f6f6f3] text-[#101010] min-h-screen font-sans selection:bg-[#2e66ff] selection:text-white">
      {/* ── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative bg-[#101112] text-white min-h-[640px] overflow-hidden pt-28 lg:pt-32 pb-16 lg:pb-0">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 z-10 flex flex-col items-start pt-4 pb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-stone-600/70 bg-[#313131]/70 text-[#2e66ff] text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
              <span className="text-base leading-none">✧</span>
              <span>PREMIUM EXHIBITION PARTNER</span>
              <span className="text-stone-400 font-normal">b</span>
              <span className="text-stone-300 font-normal capitalize">Delhi • Pan-India</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.02] tracking-tight text-[#f8f8f7] mb-6">
              Design-First{" "}
              <em className="font-serif italic font-normal text-[#2e66ff] not-italic">Exhibition</em>{" "}
              Solutions
            </h1>

            <p className="text-stone-300 text-base sm:text-lg font-normal leading-relaxed max-w-xl mb-10">
              Premium • Futuristic • Turnkey Stall Fabrication &amp; Execution Across India
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#work"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#2e66ff] hover:bg-[#174ee5] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-blue-600/30 hover:scale-[1.02]"
              >
                Explore portfolio <span className="text-lg leading-none">→</span>
              </a>
            </div>

            <p className="text-[#969696] text-xs font-bold uppercase tracking-widest mt-12 sm:mt-16">
              Double-decker spatial engineering
            </p>
          </div>

          {/* Hero Right Interactive Featured Carousel */}
          <div
            className="lg:col-span-6 relative w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl group"
            onMouseEnter={() => setIsHeroHovered(true)}
            onMouseLeave={() => setIsHeroHovered(false)}
          >
            {/* Track Images */}
            <div
              className="w-full h-full flex transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]"
              style={{ transform: `translate3d(-${heroIndex * 100}%, 0, 0)` }}
            >
              {featuredProjects.map((p, idx) => (
                <div key={p.id} className="min-w-full h-full relative">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    priority={idx === 0}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Slide Title Tag */}
                  <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-white font-semibold tracking-wider">
                    {p.title} — {p.categoryTag}
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={prevHero}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-white hover:text-black border border-white/20 text-white flex items-center justify-center text-xl transition-all duration-200 z-10"
              aria-label="Previous featured project"
            >
              ‹
            </button>
            <button
              onClick={nextHero}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-white hover:text-black border border-white/20 text-white flex items-center justify-center text-xl transition-all duration-200 z-10"
              aria-label="Next featured project"
            >
              ›
            </button>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-6 left-0 right-0 px-8 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                {featuredProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === heroIndex ? "w-8 bg-[#2e66ff]" : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <div className="bg-black/70 border border-white/10 text-white text-xs font-mono px-3 py-1.5 rounded-full">
                {String(heroIndex + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PORTFOLIO GALLERY SECTION ─────────────────────────────────── */}
      <section id="work" className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#666] mb-3">
              SELECTED PROJECTS
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101010]">
              Exhibition Stall Design Portfolio
            </h2>
          </div>
          <p className="max-w-md text-stone-600 text-sm sm:text-base leading-relaxed">
            From compact kiosks to large-format exhibition environments, every project is built around the brand and the visitor journey.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 mb-10 pb-4 border-b border-stone-300/70">
          {/* Category Pills */}
          <div className="flex items-center flex-wrap gap-2.5">
            {[
              { id: "all", label: "All" },
              { id: "exhibition", label: "Exhibition Stands" },
              { id: "activation", label: "Brand Activation" },
              { id: "concept", label: "Concepts" },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as CategoryFilter)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-[#101010] text-white shadow-md"
                      : "bg-white/80 hover:bg-stone-900 hover:text-white text-stone-700 border border-stone-300/80"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-full pl-9 pr-8 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 outline-none focus:border-stone-800 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-800"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-stone-300/70 my-8">
            <p className="text-stone-600 font-semibold mb-2">No projects match your search query.</p>
            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#101010] text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={() => openModal(project)} />
            ))}
          </div>
        )}
      </section>

      {/* ── 3. LIGHTBOX MODAL (Exact match to screenshots) ───────────────── */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-10"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full border border-stone-600 bg-stone-900/80 text-white flex items-center justify-center text-2xl hover:bg-white hover:text-black transition-colors"
            aria-label="Close modal"
          >
            ×
          </button>

          {/* Inner Modal Dialog */}
          <div
            className="relative w-full max-w-6xl my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-transparent text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Main Large View Image */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl">
                <Image
                  src={activeModalProject.images[modalActiveImgIndex]}
                  alt={activeModalProject.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right: Project Details & Thumbnail Switcher */}
            <div className="lg:col-span-5 flex flex-col items-start justify-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#2e66ff] mb-2">
                {activeModalProject.categoryTag}
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white mb-4">
                {activeModalProject.title}
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
                {activeModalProject.desc}
              </p>

              {/* Thumbnails Row */}
              {activeModalProject.images.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                    Project Gallery ({activeModalProject.images.length} views)
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    {activeModalProject.images.map((imgSrc, idx) => (
                      <button
                        key={idx}
                        onClick={() => setModalActiveImgIndex(idx)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                          idx === modalActiveImgIndex
                            ? "border-[#2e66ff] ring-2 ring-blue-500/50 scale-105 opacity-100"
                            : "border-stone-700 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={imgSrc} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Metadata Badges */}
              {(activeModalProject.stallSize || activeModalProject.venue) && (
                <div className="mt-8 pt-6 border-t border-white/10 w-full flex items-center gap-3 flex-wrap text-xs text-stone-400">
                  {activeModalProject.stallSize && (
                    <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                      Size: {activeModalProject.stallSize}
                    </span>
                  )}
                  {activeModalProject.venue && (
                    <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                      Venue: {activeModalProject.venue}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Contact Dock */}
      <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3">
        <a
          href="tel:+919643378735"
          className="w-12 h-12 rounded-full bg-[#181a1c] border border-stone-700 text-white flex items-center justify-center text-xl shadow-lg hover:scale-110 transition-transform"
          aria-label="Call Kioskra"
        >
          <Phone className="w-5 h-5" />
        </a>
        <a
          href="https://wa.me/919643378735"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#20cf68] text-white flex items-center justify-center text-xl shadow-lg hover:scale-110 transition-transform"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

// ── CARD COMPONENT WITH MULTI-IMAGE CAROUSEL ─────────────────────────────────
function ProjectCard({
  project,
  onOpen,
}: {
  project: ShowcaseProject;
  onOpen: () => void;
}) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide images every 2 seconds in a loop
  useEffect(() => {
    if (project.images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % project.images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [project.images.length, isHovered]);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % project.images.length);
  };

  const selectDot = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setCurrentImgIndex(idx);
  };

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative aspect-[16/10] rounded-[22px] overflow-hidden bg-stone-200 border border-stone-300/80 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Slider Track */}
      <div
        className="w-full h-full flex transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]"
        style={{ transform: `translate3d(-${currentImgIndex * 100}%, 0, 0)` }}
      >
        {project.images.map((src, i) => (
          <div key={i} className="min-w-full h-full relative">
            <Image
              src={src}
              alt={`${project.title} view ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 group-hover:brightness-90 transition-all duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Hover Arrow Controls (Only if >1 image) */}
      {project.images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-white hover:text-black text-white border border-white/30 flex items-center justify-center text-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-white hover:text-black text-white border border-white/30 flex items-center justify-center text-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#2e66ff] mb-1">
          {project.categoryTag}
        </p>

        <h3 className="font-serif text-2xl font-bold tracking-wide text-white leading-tight mb-2 group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>

        <div className="flex items-center justify-between pt-2 border-t border-white/20 mt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1">
            VIEW PROJECT <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>

          {/* Dots Indicator (Only if >1 image) */}
          {project.images.length > 1 && (
            <div className="flex items-center gap-1.5 pointer-events-auto">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => selectDot(e, i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentImgIndex
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/40 hover:bg-white/80"
                  }`}
                  aria-label={`Show image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
