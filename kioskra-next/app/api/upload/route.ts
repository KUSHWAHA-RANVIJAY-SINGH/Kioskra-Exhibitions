import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ur9r1q9e",
  api_key: process.env.CLOUDINARY_API_KEY || "585822969447479",
  api_secret: process.env.CLOUDINARY_API_SECRET || "hGgGqhOLCsLw2Ncc_Bbkwq2KNIU",
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "kioskra_cms" },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error("Cloudinary upload failed"));
          }
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json(
      { success: true, url: uploadResponse.secure_url },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Cloudinary Upload API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upload image to Cloudinary." },
      { status: 500 }
    );
  }
}
