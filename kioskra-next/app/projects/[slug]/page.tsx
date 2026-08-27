import React from "react";
import { notFound } from "next/navigation";
import { projectsData } from "@/lib/projectsData";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import connectDB from "@/lib/db";
import Project from "@/lib/models/Project";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  try {
    await connectDB();
    const dbProject = await Project.findOne({ slug });
    if (dbProject) {
      const project = JSON.parse(JSON.stringify(dbProject));
      return {
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
      };
    }
  } catch (err) {
    console.error("Failed to load project from DB:", err);
  }
  return projectsData.find((p) => p.slug === slug) || null;
}

export async function generateStaticParams() {
  let slugs = projectsData.map((project) => ({ slug: project.slug }));
  try {
    await connectDB();
    const dbProjects = await Project.find({}, { slug: 1 });
    if (dbProjects && dbProjects.length > 0) {
      slugs = dbProjects.map((p) => ({ slug: p.slug }));
    }
  } catch (err) {}
  return slugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const project = await getProject(slug);
  
  if (!project) {
    return {
      title: "Project Case Study Not Found | Kioskra",
    };
  }

  return {
    title: `${project.title} Case Study | Kioskra Exhibitions`,
    description: `Read how Kioskra engineered and fabricated the ${project.title} for ${project.client}. Details on design challenge, materials, and execution.`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
