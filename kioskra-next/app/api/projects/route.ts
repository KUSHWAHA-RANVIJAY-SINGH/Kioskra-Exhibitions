import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/lib/models/Project";
import { projectsData } from "@/lib/projectsData";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let projects = await Project.find({}).sort({ createdAt: -1 });

    // Sync static projects into MongoDB if missing by slug
    const existingSlugs = new Set(projects.map((p) => p.slug));
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
        projects = await Project.find({}).sort({ createdAt: -1 });
      } catch (seedErr) {
        console.warn("Project auto-sync notice:", seedErr);
      }
    }

    if (category && category !== "All") {
      projects = projects.filter((p) => p.category === category);
    }

    return NextResponse.json({ success: true, projects }, { status: 200 });
  } catch (error: unknown) {
    console.error("GET /api/projects Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const { title, slug, category, clientName, location, featuredImage, galleryImages, description } = body;

    if (!title || !slug || !category || !featuredImage) {
      return NextResponse.json(
        { error: "Title, slug, category, and featured image are required." },
        { status: 400 }
      );
    }

    const project = await Project.create({
      title,
      slug,
      category,
      clientName: clientName || "Corporate Client",
      location: location || "India",
      featuredImage,
      galleryImages: galleryImages || [],
      description: description || "",
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/projects Error:", error);
    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 }
    );
  }
}
