import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

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
  try {
    // const {done} = await req.json();
    // const res = await prisma.item.update({
    //   where: { id: Number(params.id) },
    //   data: { done }
    // })

    const data = await req.formData();
    const cover = data.get("cover");
    const title = data.get("title");
    const categoryId = Number(data.get("categoryId"));
    const content = data.get("content");
    const done = data.get("done") === 'true' ? true : false;

    console.log(cover, content, title, done, categoryId);

    if(typeof cover !== 'string' && typeof cover !== null) {
      const bytes = await cover.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(process.cwd(), "public/assets", cover.name);
      await writeFile(filePath, buffer);
    }

    const res = await prisma.item.update({
      where: { id: Number(params.id) },
      data: {
        title,
        content,
        categoryId,
        done,
        cover: cover.name
      }
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