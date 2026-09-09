"use client";

import React, { useState } from "react";
import Image from "next/image";
import { privateGalleryImages } from "@/lib/privateGalleryData";
import { Maximize2, X, ChevronLeft, ChevronRight, Lock } from "lucide-react";

export default function PrivateShowcasePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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
    <div className="pt-24 pb-20 min-h-screen bg-[#0D0F12] text-white">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-6">
          <Lock className="w-3.5 h-3.5" />
          <span>Exclusive Client Showcase</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white mb-4">
          Private Exhibition Portfolio
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-400 font-light">
          A high-definition confidential gallery featuring 148 bespoke exhibition stalls, 
          double-decker pavilions, and turnkey spatial builds engineered pan-India.
        </p>

        <div className="mt-6 flex justify-center items-center gap-6 text-xs text-gray-500 font-mono uppercase tracking-widest">
          <span>{privateGalleryImages.length} High-Res Stalls</span>
          <span>•</span>
          <span>WebP Optimized</span>
          <span>•</span>
          <span>Kioskra Archives</span>
        </div>
      </section>

      {/* Masonry Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {privateGalleryImages.map((src, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="break-inside-avoid relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl group cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5"
            >
              {/* Relative container for responsive aspect ratio inside masonry */}
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={src}
                  alt={`Private Portfolio Exhibition Stall ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-0.5">
                        Stall Design #{index + 1}
                      </p>
                      <p className="text-sm font-medium text-white">
                        Exhibition Architecture
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation - Prev */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Lightbox Image Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[75vh] rounded-lg overflow-hidden">
              <Image
                src={privateGalleryImages[selectedImageIndex]}
                alt={`Stall Showcase ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-gray-300">
                Stall {selectedImageIndex + 1} of {privateGalleryImages.length}
              </p>
            </div>
          </div>

          {/* Navigation - Next */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
