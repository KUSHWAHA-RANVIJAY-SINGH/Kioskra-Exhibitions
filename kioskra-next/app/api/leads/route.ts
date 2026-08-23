import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/lib/models/Lead";

export async function GET() {
  try {
    await connectDB();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, leads }, { status: 200 });
  } catch (error: unknown) {
    console.error("GET /api/leads Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads from database." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const clientName = body.clientName || body.name;
    const email = body.email;
    const phone = body.phone;
    const company = body.company || "";
    const eventCity = body.eventCity || "";
    const requirement = body.requirement || body.stallRequirement || "";
    const message = body.message || "";
    const configuredLayout = body.configuredLayout || undefined;

    if (!clientName || !email || !phone) {
      return NextResponse.json(
        { error: "Client Name, Email, and Phone number are required." },
        { status: 400 }
      );
    }

    const newLead = await Lead.create({
      clientName,
      company,
      email,
      phone,
      eventCity,
      requirement,
      configuredLayout,
      message,
      status: "New",
    });

    return NextResponse.json(
      { success: true, message: "Inquiry & configuration saved successfully.", lead: newLead },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("POST /api/leads Error:", error);
    return NextResponse.json(
      { error: "Failed to save inquiry to database." },
      { status: 500 }
    );
  }
}
