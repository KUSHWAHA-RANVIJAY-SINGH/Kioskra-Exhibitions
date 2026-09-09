import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Visitor from "@/lib/models/Visitor";

// In-memory rate limiting map (IP -> timestamp)
const rateLimitMap = new Map<string, number>();

// Global memory counter fallback if DB is temporarily unreachable
const globalObj = globalThis as unknown as { __visitorMemoryCount?: number };
if (typeof globalObj.__visitorMemoryCount !== "number" || globalObj.__visitorMemoryCount < 576) {
  globalObj.__visitorMemoryCount = 576;
}

function getMemoryCount(): number {
  return Math.max(globalObj.__visitorMemoryCount ?? 576, 576);
}

function setMemoryCount(val: number): number {
  const safeVal = Math.max(val, 576);
  globalObj.__visitorMemoryCount = safeVal;
  return safeVal;
}

async function getGlobalCount(): Promise<number> {
  try {
    await connectDB();
    let visitorDoc = await Visitor.findById("kioskra-main");
    if (!visitorDoc) {
      visitorDoc = await Visitor.create({
        _id: "kioskra-main",
        count: 576,
        lastUpdated: new Date(),
      });
    } else if (visitorDoc.count < 576) {
      // Upgrade count to starting base 576 if lower
      visitorDoc.count = 576;
      visitorDoc.lastUpdated = new Date();
      await visitorDoc.save();
    }
    return setMemoryCount(visitorDoc.count);
  } catch (dbErr) {
    console.warn("GET /api/visitors DB fallback:", dbErr);
    return getMemoryCount();
  }
}

async function incrementGlobalCount(): Promise<number> {
  try {
    await connectDB();
    let visitorDoc = await Visitor.findById("kioskra-main");
    if (!visitorDoc) {
      visitorDoc = await Visitor.create({
        _id: "kioskra-main",
        count: 576,
        lastUpdated: new Date(),
      });
    } else {
      if (visitorDoc.count < 576) {
        visitorDoc.count = 576;
      } else {
        visitorDoc.count += 1;
      }
      visitorDoc.lastUpdated = new Date();
      await visitorDoc.save();
    }
    return setMemoryCount(visitorDoc.count);
  } catch (dbErr) {
    console.warn("POST /api/visitors DB update warning:", dbErr);
    const nextCount = getMemoryCount() + 1;
    return setMemoryCount(nextCount);
  }
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const now = Date.now();
    const lastRequestTime = rateLimitMap.get(ip) || 0;

    // Rate limiting: max 1 increment request per 3 seconds per IP
    if (now - lastRequestTime < 3000) {
      const currentCount = await getGlobalCount();
      return NextResponse.json({ success: true, count: currentCount }, { status: 200 });
    }

    rateLimitMap.set(ip, now);

    const body = await request.json().catch(() => ({}));
    const isIncrement = body.action === "increment" || body.increment === true;

    let count: number;
    if (isIncrement) {
      count = await incrementGlobalCount();
    } else {
      count = await getGlobalCount();
    }

    return NextResponse.json({ success: true, count }, { status: 200 });
  } catch (error: unknown) {
    console.error("POST /api/visitors error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const count = await getGlobalCount();
    return NextResponse.json({ success: true, count }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: true, count: getMemoryCount() },
      { status: 200 }
    );
  }
}
