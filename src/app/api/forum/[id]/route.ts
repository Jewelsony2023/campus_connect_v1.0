import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await prisma.forumPost.findUnique({
    where: { id },
    include: { user: { select: { name: true } } },
  });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const replies = await prisma.forumReply.findMany({
    where: { postId: id },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ post, replies });
}