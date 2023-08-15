import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function DELETE(request, {params}) {
  try {
  const res = await prisma.categories.delete({
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