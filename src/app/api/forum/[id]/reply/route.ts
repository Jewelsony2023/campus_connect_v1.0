import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { body, userId } = await req.json();

  const user = await prisma.user.upsert({
    where: { email: userId },
    update: {},
    create: { email: userId, name: "Anon", role: "STUDENT" },
  });

  const created = await prisma.forumReply.create({
    data: { body, postId: id, userId: user.id },
    include: { user: { select: { name: true } } },
  });

  return NextResponse.json(created, { status: 201 });
}