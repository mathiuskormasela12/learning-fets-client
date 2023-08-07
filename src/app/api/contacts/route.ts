// ========= Contacts Api
// import all packages
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export async function GET (req: Request): Promise<NextResponse> {
  try {
    const result = await prismaClient.contact.findMany()

    if (result === null) {
      return NextResponse.json({
        statusCode: 404,
        data: result
      }, {
        status: 404
      })
    }

    return NextResponse.json({
      statusCode: 200,
      data: result
    }, {
      status: 200
    })
  } catch (err) {
    const error = err as { message: string }
    return NextResponse.json({
      statusCode: 500,
      message: error.message ?? 'Failed'
    })
  }
}
