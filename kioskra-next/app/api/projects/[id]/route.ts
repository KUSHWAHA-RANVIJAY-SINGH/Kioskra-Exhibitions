import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/lib/models/Project";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const body = await request.json();

    const { title, category, clientName, location, featuredImage } = body;

    if (!title || !category || !featuredImage) {
      return NextResponse.json(
        { error: "Title, category, and featured image are required." },
        { status: 400 }
      );
    }

    const project = await Project.findByIdAndUpdate(
      resolvedParams.id,
      { title, category, clientName, location, featuredImage },
      { new: true }
    );

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, project }, { status: 200 });
  } catch (error: unknown) {
    console.error("PUT /api/projects/[id] Error:", error);
    return NextResponse.json(
      { error: "Failed to update project." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const resolvedParams = await params;

    const project = await Project.findByIdAndDelete(resolvedParams.id);

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully." }, { status: 200 });
  } catch (error: unknown) {
    console.error("DELETE /api/projects/[id] Error:", error);
    return NextResponse.json(
      { error: "Failed to delete project." },
      { status: 500 }
    );
  }
}
