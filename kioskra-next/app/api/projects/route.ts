import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/lib/models/Project";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const query = category && category !== "All" ? { category: category as any } : {};
    const projects = await Project.find(query).sort({ createdAt: -1 });

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
