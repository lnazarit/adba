import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
import { writeFile, unlink } from "fs/promises";
import { existsSync } from 'fs';
import path from "path";
import { object } from "zod";

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
    const priority = data.get("priority");

    const dateToDone = data.get("dateToDone") !== 'null' && data.get("dateToDone") !== null ? new Date(data.get("dateToDone")) : null;
    const warranty = data.get("warranty");
    const categoryId = data.get("categoryId") !== 'null' && data.get("dateToDone") !== null  ? Number(data.get("categoryId")) : null;
    const content = data.get("content");
    const proof = data.get("proof");
    const removeCover = data.get("removeCover");
    const removeProof = data.get("removeProof");
    const done = data.get("done") === 'true' ? true : false;
    const doneRes = done ? new Date() : null;
    const coverProcess = () => {
      if(cover?.name) return cover.name;
      if(cover === 'null') return null;
    }
    const proofProcess = () => {
      if(proof?.name) return proof.name;
      if(proof === 'null') return null;
    }
    const obj = {
      title,
      content,
      categoryId,
      dateToDone,
      done,
      warranty,
      priority: priority ? Number(priority) : null,
      url,
      cover: coverProcess(),
      proof: proofProcess()
    }
    console.log(data.get("dateToDone"));
    console.log(obj)

    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    });

    console.log(obj);

  try {
    if(cover && typeof cover !== 'string' && typeof cover !== null && typeof cover !== undefined) {
      const filePath = path.join(process.cwd(), "public/assets", cover.name);
      const bytes = await cover.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);
    } else if(removeCover) {
      if(existsSync(`public/assets/${removeCover}`)){
        const filePath = path.join(process.cwd(), "public/assets", removeCover);
        await unlink(filePath);
      }
    }
    if(proof && typeof proof !== 'string' && typeof proof !== null && typeof proof !== undefined) {
      const filePath = path.join(process.cwd(), "public/assets", proof.name);
      const bytes = await proof.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);
    }
    else if(removeProof) {
      if(existsSync(`public/assets/${removeProof}`)){
        const filePath = path.join(process.cwd(), "public/assets", removeProof);
        await unlink(filePath);
      }
    }

    const res = await prisma.item.update({
      where: { id: Number(params.id) },
      data: {...obj, dateDone: doneRes, cover: coverProcess(), proof: proofProcess()}
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