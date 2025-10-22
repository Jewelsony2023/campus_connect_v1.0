import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/* ---------- helpers ---------- */
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

/* ---------- POST  (create with validation + error visibility) ---------- */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[POST /api/events] body received:", body);

    /* ---- minimal validation ---- */
    const { title, description, location, start, end, approved = true } = body;
    if (!title || !description || !location || !start || !end)
      return badRequest("Missing required fields: title, description, location, start, end");

    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()))
      return badRequest("start or end is not a valid ISO-date string");
    if (endDate <= startDate)
      return badRequest("end must be after start");

    /* ---- create ---- */
const created = await prisma.event.create({
  data: {
    title,
    description,
    location,
    start: startDate,
    end: endDate,
    approved: Boolean(approved),
    createdById: "cl9xyz0000000userplaceholder", // ← replace with real user id later
  },
});
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    console.error("[POST /api/events] Prisma error:", err.message);
    return badRequest(err.message);
  }
}