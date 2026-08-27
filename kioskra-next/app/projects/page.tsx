import React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import ProjectsCatalogClient from "@/components/ProjectsCatalogClient";
import { projectsData } from "@/lib/projectsData";
import connectDB from "@/lib/db";
import Project from "@/lib/models/Project";
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

export default async function ProjectsPage() {
  let dbProjectsList: any[] = [];

  try {
    await connectDB();
    const dbProjects = await Project.find({}).sort({ createdAt: -1 });
    dbProjectsList = JSON.parse(JSON.stringify(dbProjects));
  } catch (err) {
    console.error("Failed to load projects from DB:", err);
  }

  // Map Mongoose schema properties to client UI expectations
  const mappedDbProjects = dbProjectsList.map((project: any) => ({
    slug: project.slug,
    title: project.title,
    client: project.clientName,
    location: project.location,
    venue: project.location,
    areaSize: "Custom Stall",
    year: new Date(project.createdAt).getFullYear().toString(),
    heroImage: project.featuredImage,
    galleryImages: project.galleryImages && project.galleryImages.length > 0 ? project.galleryImages : [project.featuredImage],
    challenge: project.description || "Custom spatial stall design engineered and executed by Kioskra.",
    executionDetails: "Premium modular fabrication and on-site assembly within 72 hours guaranteed.",
    results: "Highly successful exhibition campaign with massive footfall and strong brand presence.",
    category: project.category,
    tag: project.category === "3D Renders" ? "3D Render" : project.category === "Double Decker" ? "Double Decker" : project.category === "Turnkey Solutions" ? "Turnkey Solution" : "Custom Stall"
  }));

  // Combine custom database projects with default static ones
  const combinedProjects = [...mappedDbProjects, ...projectsData];

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
        <ProjectsCatalogClient projects={combinedProjects} />
      </Section>
    </div>
  );
}
