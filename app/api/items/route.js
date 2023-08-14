import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma';
import {z} from 'zod';

const schema =  z.object({
  title: z.string().min(3),
  content: z.string().min(3),
  done: z.boolean(),
  categoryId: z.number()
})

export async function GET(req) {
  const {searchParams} = new URL(req.url);
  const currentPage = Math.max(Number(searchParams.get('page') || 1), 1)
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const PER_PAGE = Math.max(Number(searchParams.get('per_page') || 3), 3);

  let items = await prisma.item.findMany({
    take: PER_PAGE,
    skip: (currentPage - 1) * PER_PAGE,
  })
  let count = await prisma.item.count()
  const total = await prisma.item.count();

  if(category) {
    items = await prisma.item.findMany({
      where: {
        categoryId: parseInt(param)
      }
    })
    count = await prisma.item.count({
      where: {
        categoryId: parseInt(param)
      }
    })
  }
  if(search) {
    items = await prisma.item.findMany({
      where: {
        content: {
          search: 'espejo'
        }
      }
    })
    // count = await prisma.item.count({
    //   where: {
    //     title: {
    //       search
    //     }
    //   }
    // })
  }
  return NextResponse.json({items, meta: {total_items: total, total: count, page: currentPage, per_page: PER_PAGE}})
}

export async function POST(request) {
  const {title, content, categoryId, done, body} = await request.json();
  try {
    const response = schema.safeParse({title, content, categoryId, done, body})

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json({
      error: { message: "Invalid request", errors },
    });
  }
    const newItem = await prisma.item.create({
      data: {
        title,
        content,
        categoryId,
        done
      }
    })
    return NextResponse.json(newItem)
  } catch(err) {
    return NextResponse.json({error: err})
  }
}