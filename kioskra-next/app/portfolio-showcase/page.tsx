"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { privateGalleryImages } from "@/lib/privateGalleryData";
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles, LayoutGrid, Search, Eye } from "lucide-react";

export default function PortfolioShowcasePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Custom Stalls", "Double Decker", "Interactive Pavilions"];

  const filteredImages = useMemo(() => {
    return privateGalleryImages.filter((_, index) => {
      const stallName = `Stall Design #${index + 1}`;
      return stallName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % privateGalleryImages.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + privateGalleryImages.length) % privateGalleryImages.length
      );
    }
  };

  return (
    <div className="pt-20 pb-24 min-h-screen bg-[#0A0C10] text-white selection:bg-blue-500 selection:text-white">
      {/* Hero Banner Section (Inspired by Spark Innovations Reference Design) */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-[#0A0C10] border-b border-white/10">
        {/* Background Decorative Grid and Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#2F6BFF_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb Path */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#2F6BFF] mb-4 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
            <span>Kioskra Exhibitions</span>
            <span className="text-gray-500">/</span>
            <span className="text-white font-bold">Exhibition Stands</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-sans text-white mb-6 drop-shadow-sm">
            Exhibition <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white">Stands Showcase</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-gray-300 font-light leading-relaxed mb-8">
            Explore Kioskra’s master archive of bespoke exhibition stalls, double-decker pavilions, and high-impact spatial builds engineered pan-India.
          </p>

          {/* Metadata Badges */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-gray-400 font-medium">
            <span className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              {privateGalleryImages.length} High-Res Stall Builds
            </span>
            <span className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              ⚡ WebP 4K Optimized
            </span>
            <span className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              🏛️ Kioskra Master Archives
            </span>
          </div>
        </div>
      </section>

      {/* Filter and Search Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 mb-12">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stall #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/15 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Image Gallery Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredImages.map((src, index) => {
            const originalIndex = privateGalleryImages.indexOf(src);
            return (
              <div
                key={originalIndex}
                onClick={() => openLightbox(originalIndex)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900/80 border border-white/10 shadow-xl cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Image Container with fixed high-def ratio */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-950">
                  <Image
                    src={src}
                    alt={`Kioskra Exhibition Stand Design ${originalIndex + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="bg-slate-950/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-400 px-2.5 py-1 rounded-md">
                      #{originalIndex + 1}
                    </span>
                  </div>

                  {/* Top Right Zoom Icon */}
                  <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                    <Eye className="w-4 h-4 text-blue-400" />
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex items-end justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-0.5">
                        Kioskra Stall #{originalIndex + 1}
                      </p>
                      <h3 className="text-base font-bold text-white tracking-wide">
                        Exhibition Architecture
                      </h3>
                      <p className="text-xs text-gray-400 font-light mt-0.5">
                        Turnkey Pavilion Design & Execution
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/15 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation - Prev */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/10 hover:bg-blue-600 text-white transition-all border border-white/15 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Lightbox Image Container */}
          <div
            className="relative max-w-6xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[75vh] rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl">
              <Image
                src={privateGalleryImages[selectedImageIndex]}
                alt={`Kioskra Stall Showcase ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center flex items-center gap-3">
              <span className="text-sm font-semibold text-blue-400 font-mono">
                Stall {selectedImageIndex + 1} of {privateGalleryImages.length}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-sm text-gray-300 font-medium">
                Kioskra Exhibition Architecture
              </span>
            </div>
          </div>

          {/* Navigation - Next */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/10 hover:bg-blue-600 text-white transition-all border border-white/15 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
