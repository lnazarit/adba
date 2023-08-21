import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import {prisma} from '@/libs/prisma';
import {z} from 'zod';
import path from "path";

const schema =  z.object({
  title: z.string().min(3),
  cover: z.string(),
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

  let items = await prisma.item.findMany(!search && {
    take: PER_PAGE,
    skip: (currentPage - 1) * PER_PAGE,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      category: true,
    },
  })
  let count = await prisma.item.count()
  const total = await prisma.item.count();

  const obj = {}
  if(category) obj.categoryId = parseInt(category)
  if(search !== '' && search !== null) {
    obj.title = {
      contains: search
    }
  } else {
    delete obj.search
  }

  if(category || search) {
    items = await prisma.item.findMany({
      where: {
        ...obj
      },
      take: PER_PAGE,
      skip: (currentPage - 1) * PER_PAGE,
      include: {
        category: true,
      },
    })
    count = await prisma.item.count({
      where: {
        ...obj
      }
    })
  }

  return NextResponse.json({items, meta: {total_items: total, total: count, page: currentPage, per_page: PER_PAGE}})
}

export async function POST(request) {
  const data = await request.formData();
  const cover = data.get("cover");
  const title = data.get("title");
  const categoryId = Number(data.get("categoryId"));
  const content = data.get("content");
  const done = data.get("done") === 'true' ? true : false;

  if (!cover) return NextResponse.json({ success: false });

  const bytes = await cover.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public/assets", cover.name);
  await writeFile(filePath, buffer);

  try {
    const response = schema.safeParse({title, content, categoryId, done, cover: cover.name})

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
        done,
        cover: cover.name
      }
    })
    return NextResponse.json(newItem)
  } catch(err) {
    return NextResponse.json({error: err.message})
  }
}