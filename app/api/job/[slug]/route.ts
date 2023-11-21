import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: any, { params }: any) {
  const slug = params.slug;
  const post = await prisma.$executeRawUnsafe(
    `DELETE FROM JobPostings WHERE jobID = ?`,
    slug
  );

  return NextResponse.json(request);
}
