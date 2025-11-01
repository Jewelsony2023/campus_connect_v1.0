// src\app\api\events\route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

function badRequest(msg: string) {
  return NextResponse.json({ error: msg }, { status: 400 });
}

/* ---------- GET  (auto-delete past, return future) ---------- */
export async function GET() {
  const now = new Date();
  await prisma.event.deleteMany({ where: { end: { lt: now } } });
  const events = await prisma.event.findMany({
    where: { approved: true },
    orderBy: { start: "asc" },
  });
  return NextResponse.json(events);
}

/* ---------- POST  (create with optional image) ---------- */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const start = formData.get("start") as string;
    const end = formData.get("end") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !description || !location || !start || !end)
      return badRequest("Missing required fields");

    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()))
      return badRequest("Invalid date format");
    if (endDate <= startDate)
      return badRequest("End must be after start");

    let imageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadRes: any = await new Promise((res, rej) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image", folder: "campus" }, (err, result) => {
            if (err) rej(err);
            else res(result);
          })
          .end(buffer);
      });
      imageUrl = uploadRes.secure_url;
    }

    const created = await prisma.event.create({
      data: {
        title,
        description,
        location,
        start: startDate,
        end: endDate,
        approved: true,
        createdById: "placeholder_user_id", // TODO: replace with real user after auth
      },
    });

    return NextResponse.json({ ...created, imageUrl }, { status: 201 });
  } catch (err: any) {
    console.error("[POST /api/events]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}