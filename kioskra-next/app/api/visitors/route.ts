import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Visitor from "@/lib/models/Visitor";

// In-memory rate limiting map (IP -> timestamp)
const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const now = Date.now();
    const lastRequestTime = rateLimitMap.get(ip) || 0;

    // Rate limiting: max 1 update per 5 seconds per IP
    if (now - lastRequestTime < 5000) {
      return NextResponse.json(
        { error: "Too many requests. Please wait 5 seconds." },
        { status: 429 }
      );
    }

    rateLimitMap.set(ip, now);

    const body = await request.json().catch(() => ({}));
    const count = typeof body.count === "number" ? body.count : null;

    if (count === null || isNaN(count)) {
      return NextResponse.json({ error: "Invalid count parameter." }, { status: 400 });
    }

    // Async background update to MongoDB without blocking response
    (async () => {
      try {
        await connectDB();
        let visitorDoc = await Visitor.findById("kioskra-main");
        if (!visitorDoc) {
          await Visitor.create({
            _id: "kioskra-main",
            count: count,
            lastUpdated: new Date(),
          });
        } else {
          visitorDoc.count = Math.max(visitorDoc.count + 1, count);
          visitorDoc.lastUpdated = new Date();
          await visitorDoc.save();
        }
      } catch (dbErr) {
        console.warn("Background DB visitor update warning:", dbErr);
      }
    })();

    // Immediate 200 response
    return NextResponse.json({ success: true, count }, { status: 200 });
  } catch (error: unknown) {
    console.error("POST /api/visitors error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    let count = 200;
    try {
      await connectDB();
      const visitorDoc = await Visitor.findById("kioskra-main");
      if (visitorDoc) {
        count = visitorDoc.count;
      }
    } catch (dbErr) {
      console.warn("GET /api/visitors DB fallback:", dbErr);
    }
    return NextResponse.json({ success: true, count }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, count: 200 }, { status: 200 });
  }
}
