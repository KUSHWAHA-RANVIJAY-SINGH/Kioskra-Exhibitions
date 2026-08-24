import React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import ProjectsCatalogClient from "@/components/ProjectsCatalogClient";
import { projectsData } from "@/lib/projectsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exhibition Portfolio & Case Studies | Kioskra Exhibitions",
  description: "Browse Kioskra's award-winning portfolio of custom exhibition stalls, double-decker pavilions, turnkey physical builds, and premium 3D spatial renders executed across India.",
  keywords: [
    "exhibition portfolio",
    "stalls gallery",
    "Kioskra projects",
    "double decker stalls",
    "custom fabrication",
    "BKC Mumbai",
    "Pragati Maidan Delhi",
    "BIEC Bengaluru",
  ],
};

export default function ProjectsPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-brand-warmOffWhite">
      {/* Header Banner Section */}
      <Section className="pb-4">
        <Heading
          badge="Exhibition Architecture Portfolio"
          sansPrefix="Selected"
          serifAccent="Spatial"
          sansSuffix="Commissions"
          subtitle="Explore our curated catalog of bespoke exhibition pavilions, monolithic stands, and modular trade fair structures delivered pan-India."
          size="xl"
        />
      </Section>

      {/* Interactive Catalog Section */}
      <Section className="pt-0 pb-20">
        <ProjectsCatalogClient projects={projectsData} />
      </Section>
    </div>
  );
}
