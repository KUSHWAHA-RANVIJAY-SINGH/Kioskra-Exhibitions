import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/lib/models/Lead";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["New", "Contacted", "Closed"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value. Must be 'New', 'Contacted', or 'Closed'." },
        { status: 400 }
      );
    }

    const lead = await Lead.findByIdAndUpdate(
      resolvedParams.id,
      { status },
      { new: true }
    );

    if (!lead) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead }, { status: 200 });
  } catch (error: unknown) {
    console.error("PATCH /api/leads/[id] Error:", error);
    return NextResponse.json(
      { error: "Failed to update lead status." },
      { status: 500 }
    );
  }
}
