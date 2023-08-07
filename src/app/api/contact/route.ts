// ======== Contact
// import all packages
import { PrismaClient } from '@prisma/client'
import { NextResponse, type NextRequest } from 'next/server'

const prismaClient = new PrismaClient()

export async function POST (req: NextRequest): Promise<NextResponse> {
  interface Body {
    contact_name: string
    email: string
    phone_number: string
  }

  const body: Body = await req.json()

  if (typeof body.contact_name !== 'string') {
    return NextResponse.json({
      statusCode: 400,
      message: 'Contact name is required'
    }, { status: 400 })
  }

  if (typeof body.email !== 'string') {
    return NextResponse.json({
      statusCode: 400,
      message: 'Email is required'
    }, { status: 400 })
  }

  if (typeof body.phone_number !== 'string') {
    return NextResponse.json({
      statusCode: 400,
      message: 'Phone number is required'
    }, { status: 400 })
  }

  try {
    const result = await prismaClient.contact.findFirst({
      where: {
        email: body.email
      }
    })

    if (result != null) {
      return NextResponse.json({
        statusCode: 400,
        message: 'Email already in used'
      }, { status: 400 })
    }

    await prismaClient.contact.create({
      data: {
        contact_name: body.contact_name,
        email: body.email,
        phone_number: body.phone_number
      }
    })

    return NextResponse.json({
      statusCode: 201,
      message: 'Register success'
    }, { status: 201 })
  } catch (err) {
    const error = err as { message: string }
    return NextResponse.json({
      statusCode: 500,
      message: error.message ?? 'Failed'
    }, { status: 500 })
  }
}
