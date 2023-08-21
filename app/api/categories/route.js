import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma';
import { slugify } from "@/utils";

export async function GET() {
  const categories = await prisma.categories.findMany()
  return NextResponse.json(categories)
}

export async function POST(request) {
  const {name, slug} = await request.json();
  try {
    const newCategory = await prisma.categories.create({
      data: {
        name,
        slug: slugify(slug)
      }
    })

    if (!newCategory) {
      return NextResponse.json({
        message: 'Not found'
      }, { status: 404})
    }
    return NextResponse.json(newCategory)
  } catch(err) {
    if (err instanceof Error) {
      return NextResponse.json(
        {
          message: err.message,
        },
        {
          status: 409,
        }
      );
    }
  }
}