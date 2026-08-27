import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Exhibition from "@/lib/models/Exhibition";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const body = await request.json();

    const {
      title,
      startDate,
      endDate,
      location,
      venue,
      descriptionMarkdown,
      featuredImage,
      status,
    } = body;

    if (
      !title ||
      !startDate ||
      !endDate ||
      !location ||
      !venue ||
      !descriptionMarkdown ||
      !featuredImage
    ) {
      return NextResponse.json(
        { error: "All core fields are required." },
        { status: 400 }
      );
    }

    const exhibition = await Exhibition.findByIdAndUpdate(
      resolvedParams.id,
      {
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        venue,
        descriptionMarkdown,
        featuredImage,
        status,
      },
      { new: true }
    );

    if (!exhibition) {
      return NextResponse.json({ error: "Exhibition not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, exhibition }, { status: 200 });
  } catch (error: unknown) {
    console.error("PUT /api/exhibitions/[id] Error:", error);
    return NextResponse.json(
      { error: "Failed to update exhibition." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const resolvedParams = await params;

    const exhibition = await Exhibition.findByIdAndDelete(resolvedParams.id);

    if (!exhibition) {
      return NextResponse.json({ error: "Exhibition not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Exhibition deleted successfully." }, { status: 200 });
  } catch (error: unknown) {
    console.error("DELETE /api/exhibitions/[id] Error:", error);
    return NextResponse.json(
      { error: "Failed to delete exhibition." },
      { status: 500 }
    );
  }
}
