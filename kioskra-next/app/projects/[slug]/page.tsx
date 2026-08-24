import React from "react";
import { notFound } from "next/navigation";
import { projectsData } from "@/lib/projectsData";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const project = projectsData.find((p) => p.slug === slug);
  
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
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
