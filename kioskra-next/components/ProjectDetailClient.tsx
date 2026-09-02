"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Layers, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { ProjectData } from "@/lib/projectsData";
import Button from "@/components/Button";
import Section from "@/components/Section";

interface ProjectDetailClientProps {
  project: ProjectData;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  // Split title programmatically to create Sans + Serif Italic Editorial layout
  const words = project.title.split(" ");
  const lastWord = words.pop();
  const prefix = words.join(" ");

  // Material and execution highlights
  const materials = [
    "High-gloss premium acrylic cladding",
    "Backlit seamless tension fabric graphics",
    "CCT-controlled LED directional spotlighting",
    "Custom CNC-routed display fixtures",
    "Seamless raised platform flooring",
  ];

  return (
    <div className="pt-28 md:pt-36 min-h-screen bg-brand-warmOffWhite pb-24">
      {/* Top Breadcrumb Navigation */}
      <Section className="pb-4">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 hover:text-brand-electricBlue transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Projects</span>
        </Link>
      </Section>

      {/* Redesigned 2-Column Editorial Title Block */}
      <Section className="pt-0 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Title & Category */}
          <div className="md:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-electricBlue/10 text-[10px] font-extrabold uppercase tracking-widest text-brand-electricBlue border border-brand-electricBlue/20">
              {project.tag}
            </span>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brand-deepBlack tracking-tight leading-tight">
              {prefix}{" "}
              <span className="font-serif italic text-brand-electricBlue">
                {lastWord}
              </span>
            </h1>

            {/* Badges for Client & Location */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-brand-charcoal/70 pt-2 border-t border-brand-softStone/60 max-w-2xl">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4 text-brand-electricBlue" />
                <span>Client: <span className="text-brand-deepBlack">{project.client}</span></span>
              </div>
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-brand-electricBlue" />
                <span>Location: <span className="text-brand-deepBlack">{project.location}</span></span>
              </div>
            </div>
          </div>

          {/* Right Column: Brief Intro Summary */}
          <div className="md:col-span-4 md:pt-14">
            <div className="border-l-2 border-brand-electricBlue pl-6">
              <p className="text-xs uppercase tracking-widest text-brand-charcoal/50 font-extrabold mb-2 block">
                Executive Brief
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed font-semibold">
                An architectural showcase centering on brand visibility, flow ergonomics, and pristine material engineering at {project.venue.split(",")[0]}.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Massive Hero Image Section with Framer Motion Animation */}
      <Section className="pt-0 pb-4">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[50vh] md:h-[75vh] rounded-2xl overflow-hidden shadow-2xl mt-4 mb-16 bg-brand-softStone border border-brand-softStone"
        >
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </Section>

      {/* 2-Column Split Details */}
      <Section className="pt-0 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Detailed Copy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-deepBlack">
                Project Challenge
              </h2>
              <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed font-medium">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-deepBlack">
                Execution & Fabrication Details
              </h2>
              <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed font-medium">
                {project.executionDetails}
              </p>
              <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed font-medium">
                {project.results}
              </p>
            </div>

            {/* Spec Highlights Checklist */}
            <div className="space-y-4 pt-4">
              <h3 className="text-sm uppercase tracking-widest font-extrabold text-brand-charcoal/60">
                Architectural Specifications Used
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {materials.map((material, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-deepBlack font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-brand-electricBlue flex-shrink-0 mt-0.5" />
                    <span>{material}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Project Meta Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="p-8 rounded-3xl bg-white border border-brand-softStone shadow-lg space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-electricBlue">
                  Project Metadata
                </span>
                <h3 className="text-lg font-extrabold text-brand-deepBlack">
                  Technical Specifications
                </h3>
              </div>

              {/* Specs Fields List */}
              <div className="divide-y divide-brand-softStone/60 text-xs">
                <div className="py-3 flex justify-between">
                  <span className="font-bold text-brand-charcoal/60">VENUE</span>
                  <span className="font-extrabold text-brand-deepBlack text-right">{project.venue.split(",")[0]}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="font-bold text-brand-charcoal/60">STALL DIMENSION</span>
                  <span className="font-extrabold text-brand-deepBlack">{project.areaSize}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="font-bold text-brand-charcoal/60">YEAR OF FABRICATION</span>
                  <span className="font-extrabold text-brand-deepBlack">{project.year}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="font-bold text-brand-charcoal/60">HANDOVER TIMEFRAME</span>
                  <span className="font-extrabold text-brand-deepBlack inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-electricBlue" />
                    <span>72 Hours Guaranteed</span>
                  </span>
                </div>
              </div>

              {/* Call To Action */}
              <div className="pt-4 space-y-3">
                <Button 
                  href={`/contact?source=${project.slug}`} 
                  variant="primary" 
                  className="w-full justify-center py-4"
                >
                  Request Similar Stall Design
                </Button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-brand-charcoal/60 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-brand-electricBlue" />
                  <span>Free consultation & structural blueprints</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Section>

      {/* Build Photo Gallery */}
      <Section className="pt-0 pb-16">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-electricBlue font-extrabold block">
              Execution Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-deepBlack">
              Fabrication & Render Angles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.galleryImages.map((image, idx) => (
              <div 
                key={idx} 
                className="relative aspect-video rounded-2xl overflow-hidden border border-brand-softStone/60 bg-brand-softStone shadow-sm group cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`${project.title} - Gallery Angle ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Bottom CTA Banner */}
      <Section className="pt-0">
        <div className="bg-brand-deepBlack rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 border border-white/10 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-electricBlue/10 to-transparent pointer-events-none" />
          
          <div className="space-y-2 z-10 max-w-xl">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-electricBlue">
              Interactive 3D Planning
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Have an Upcoming Exhibition?
            </h2>
            <p className="text-xs sm:text-sm text-brand-softStone/70 leading-relaxed">
              Design your custom layout, visualize size bounds, and request instant fabrication estimates using our signature 3D Booth Configurator.
            </p>
          </div>

          <Link
            href="/configurator"
            className="inline-flex items-center justify-center gap-2 bg-brand-electricBlue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-full transition-all shadow-md group self-start md:self-auto z-10"
          >
            <span>Launch 3D Booth Configurator</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>
    </div>
  );
}
