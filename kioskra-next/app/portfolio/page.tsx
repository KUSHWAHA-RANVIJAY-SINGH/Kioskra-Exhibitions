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
    "Kioskra portfolio",
    "double decker stalls",
    "custom fabrication",
    "BKC Mumbai",
    "Pragati Maidan Delhi",
    "BIEC Bengaluru",
  ],
};

export default async function PortfolioPage() {
  let dbProjectsList: any[] = [];

  try {
    await connectDB();
    let dbProjects = await Project.find({}).sort({ createdAt: -1 });
    
    // Auto sync missing static projects
    const existingSlugs = new Set(dbProjects.map((p) => p.slug));
    const missingProjects = projectsData.filter((p) => !existingSlugs.has(p.slug));
    if (missingProjects.length > 0) {
      try {
        const seedPayload = missingProjects.map((p) => ({
          title: p.title,
          slug: p.slug,
          category: p.category,
          clientName: p.client,
          location: p.location,
          featuredImage: p.heroImage,
          galleryImages: p.galleryImages || [],
          description: p.challenge || "",
        }));
        await Project.insertMany(seedPayload);
        dbProjects = await Project.find({}).sort({ createdAt: -1 });
      } catch (seedErr) {
        console.warn("Portfolio auto seed error:", seedErr);
      }
    }
    
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

  const finalProjects = mappedDbProjects.length > 0 ? mappedDbProjects : projectsData;

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-brand-warmOffWhite">
      {/* Header Banner Section */}
      <Section className="py-6 sm:py-8 pb-2 sm:pb-3">
        <Heading
          badge="Exhibition Architecture Portfolio"
          sansPrefix="Selected"
          serifAccent="Spatial"
          sansSuffix="Commissions"
          subtitle="Explore our curated catalog of bespoke exhibition pavilions, monolithic stands, and modular trade fair structures delivered pan-India."
          size="xl"
          className="mb-2 sm:mb-4"
        />
      </Section>

      {/* Interactive Catalog Section */}
      <Section className="pt-0 pb-12 sm:pb-16">
        <ProjectsCatalogClient projects={finalProjects} />
      </Section>
    </div>
  );
}
