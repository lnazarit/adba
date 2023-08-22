import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(request, {params}) {
  try {
  const res = await prisma.item.findFirst({
    where: {
      id: Number(params.id)
    }
  })
  if(!res) {
    return NextResponse.json({
      message: 'Not found'
    }, { status: 404})
  }
  return NextResponse.json(res);
  } catch(error) {
    if(error instanceof Error) {
      return NextResponse.json({
        message: error.message
      }, {
        status: 500
      })
    }
  }
}

export async function DELETE(request, {params}) {
  try {
  const res = await prisma.item.delete({
    where: {
      id: Number(params.id)
    }
  })
  if(!res) {
    return NextResponse.json({
      message: 'Not found'
    }, { status: 404})
  }
  return NextResponse.json(res)
  } catch(error) {
    if(error instanceof Error) {
      return NextResponse.json({
        message: error.message
      }, {
        status: 500
      })
    }
  }
}

export async function PUT(req, {params}) {
  const data = await req.formData();
    const cover = data.get("cover");
    const title = data.get("title");
    const url = data.get("url");
    const categoryId = data.get("categoryId") ? Number(data.get("categoryId")) : null;
    const content = data.get("content");
    const done = data.get("done") === 'true' ? true : false;
    const obj = {
      title,
      content,
      categoryId,
      done,
      url,
      cover: cover?.name
    }
    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    });
  try {
    if(cover && typeof cover !== 'string' && typeof cover !== null && typeof cover !== undefined) {
      const bytes = await cover.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(process.cwd(), "public/assets", cover.name);
      await writeFile(filePath, buffer);
    }

    const res = await prisma.item.update({
      where: { id: Number(params.id) },
      data: obj
    });

    if(!res) {
      return NextResponse.json({
        message: 'Not found'
      }, { status: 404})
    }

    return NextResponse.json(res);

  } catch(error) {
    console.log(obj)
    if(error instanceof Error) {
      return NextResponse.json({
        message: error.message
      }, {
        status: 500
      })
    }
  }
}