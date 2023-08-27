import { unlink } from "fs/promises";
import { NextResponse } from "next/server";
import { existsSync } from 'fs';
import path from "path";

export async function POST(request) {
  const {cover} = await request.json();
    if(existsSync(`public/assets/${cover}`)){
      const filePath = path.join(process.cwd(), "public/assets", cover);
      await unlink(filePath);
      return NextResponse.json({message: 'success removed'})
    }
    return NextResponse.json({message: 'Not image'})
}
