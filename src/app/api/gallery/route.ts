import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  // Fetch all images from your Cloudinary cloud (no local DB)
  const result = await cloudinary.api.resources({
    type: "upload",
    max_results: 500,
    sort_by: [{ field: "created_at", direction: "desc" }],
  });

  const urls = result.resources.map((r: any) => r.secure_url);
  return NextResponse.json(urls);
}