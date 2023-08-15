import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma';
import { slugify } from "@/utils";

export async function GET() {
  const categories = await prisma.categories.findMany()
  return NextResponse.json(categories)
}

export async function POST(request) {
  const {name, slug} = await request.json();
  const newCategory = await prisma.categories.create({
    data: {
      name,
      slug: slugify(slug)
    }
  })

  return NextResponse.json(newCategory)
}