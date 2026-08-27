import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Exhibition from "@/lib/models/Exhibition";

export async function GET() {
  try {
    await connectDB();
    const exhibitions = await Exhibition.find({}).sort({ startDate: 1 });
    return NextResponse.json({ success: true, exhibitions }, { status: 200 });
  } catch (error: unknown) {
    console.error("GET /api/exhibitions Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exhibitions." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const {
      title,
      slug,
      startDate,
      endDate,
      location,
      venue,
      descriptionMarkdown,
      featuredImage,
      metaTitle,
      metaDescription,
      status,
    } = body;

    if (
      !title ||
      !slug ||
      !startDate ||
      !endDate ||
      !location ||
      !venue ||
      !descriptionMarkdown ||
      !featuredImage
    ) {
      return NextResponse.json(
        { error: "All core fields (title, slug, dates, venue, location, description, image) are required." },
        { status: 400 }
      );
    }

    const exhibition = await Exhibition.create({
      title,
      slug,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location,
      venue,
      descriptionMarkdown,
      featuredImage,
      metaTitle: metaTitle || `${title} | Kioskra`,
      metaDescription: metaDescription || `Looking to exhibit at ${title}? Get a quote today.`,
      status: status || "Draft",
    });

    return NextResponse.json({ success: true, exhibition }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/exhibitions Error:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "An exhibition with this slug already exists." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create exhibition." },
      { status: 500 }
    );
  }
}
