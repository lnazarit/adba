import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
import { writeFile, unlink, existsSync } from "fs/promises";
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
    const removeCover = data.get("removeCover");
    const done = data.get("done") === 'true' ? true : false;
    const doneRes = done ? new Date() : null;
    const coverProcess = () => {
      if(cover?.name) return cover.name;
      if(cover === 'null') return null;
    }
    const obj = {
      title,
      content,
      categoryId,
      done,
      url,
      cover: coverProcess()
    }
    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    });
  try {
    if(cover && typeof cover !== 'string' && typeof cover !== null && typeof cover !== undefined) {
      const filePath = path.join(process.cwd(), "public/assets", cover.name);
      const bytes = await cover.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);
    } else if(removeCover !== 'null') {
      const filePath = path.join(process.cwd(), "public/assets", removeCover);
      await unlink(filePath);
    }
    const res = await prisma.item.update({
      where: { id: Number(params.id) },
      data: {...obj, dateDone: doneRes, cover: coverProcess()}
    });

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