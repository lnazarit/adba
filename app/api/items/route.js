import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import {prisma} from '@/libs/prisma';
import {z} from 'zod';
import path from "path";

export async function GET(req) {
  const {searchParams} = new URL(req.url);
  const currentPage = Math.max(Number(searchParams.get('page') || 1), 1)
  const category = searchParams.get("category");
  const done = searchParams.get("done");
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
  if(done) {
    let doneVar;
    if(done === "1") doneVar = true;
    if(done === "0") doneVar = false;
    obj.done = doneVar;
    if(done === "null") delete obj.done;
  }
  if(search !== '' && search !== null) {
    obj.title = {
      contains: search
    }
  } else {
    delete obj.search
  }

  if(category || search || done) {
    items = await prisma.item.findMany({
      where: {
        ...obj
      },
      take: PER_PAGE,
      skip: (currentPage - 1) * PER_PAGE,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc'
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
  const dateToDone = data.get("dateToDone");
  const url = data.get("url");
  const categoryId = Number(data.get("categoryId"));
  const content = data.get("content");
  const done = data.get("done") === 'true' ? true : false;

  if(cover && cover !== 'null' && typeof cover !== 'string' && typeof cover !== null && typeof cover !== undefined) {
    const bytes = await cover.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public/assets", cover.name);
    await writeFile(filePath, buffer);
  }

  try {
    const obj = {
      title,
      content,
      categoryId,
      dateToDone: dateToDone !== 'null' ? new Date(dateToDone) : null,
      done,
      url,
      dateDone: done ? new Date() : null,
      cover: cover !== 'null' ? cover?.name : null
    }

    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        delete obj[key];
      }
    });

    const objSchema = {
      title: z.string().min(3),
      cover: z.string(),
      content: z.string().min(3),
      dateToDone: z.date(),
      dateDone: z.date(),
      done: z.boolean(),
      categoryId: z.number(),
      url: z.string()
    }

    Object.keys(objSchema).forEach(key => {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        delete objSchema[key];
      }
    });

    const schema =  z.object(objSchema)

    const response = schema.safeParse(obj)

    if (!response.success) {
      const { errors } = response.error;
      return NextResponse.json({message: 'Invalid request', errors}, { status: 403})
      // return NextResponse.json({
      //   error: { message: "Invalid request", errors }, status: 409
      // });

    }
      const newItem = await prisma.item.create({data: obj})
      return NextResponse.json(newItem)
    } catch(err) {
      return NextResponse.json({error: err.message})
    }
}