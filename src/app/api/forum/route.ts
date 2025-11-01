import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.forumPost.findMany({
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    include: { user: { select: { name: true } }, _count: { select: { replies: true } } },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const user = await prisma.user.upsert({
    where: { email: "placeholder@campus.local" },
    update: {},
    create: { email: "placeholder@campus.local", name: "Placeholder User", role: "STUDENT" },
  });

  const created = await prisma.forumPost.create({
    data: { ...body, userId: user.id },
  });
  return NextResponse.json(created, { status: 201 });
}