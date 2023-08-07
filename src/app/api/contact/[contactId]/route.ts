// ========= Contact Api
// import all packages
import { NextResponse, type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export async function GET (req: Request, { params }: { params: { contactId: string } }): Promise<NextResponse> {
  try {
    const result = await prismaClient.contact.findUnique({
      where: {
        id: params.contactId
      }
    })

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

export async function PUT (req: NextRequest, { params }: { params: { contactId: string } }): Promise<NextResponse> {
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

    if (result == null) {
      return NextResponse.json({
        statusCode: 404,
        message: 'Not found'
      }, { status: 404 })
    }

    await prismaClient.contact.update({
      where: {
        id: params.contactId
      },
      data: {
        contact_name: body.contact_name,
        email: body.email,
        phone_number: body.phone_number
      }
    })

    return NextResponse.json({
      statusCode: 201,
      message: 'Update success'
    }, { status: 201 })
  } catch (err) {
    const error = err as { message: string }
    return NextResponse.json({
      statusCode: 500,
      message: error.message ?? 'Failed'
    }, { status: 500 })
  }
}

export async function DELETE (req: NextRequest, { params }: { params: { contactId: string } }): Promise<NextResponse> {
  try {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: params.contactId
      }
    })

    if (contact === null) {
      return NextResponse.json({
        statusCode: 404,
        message: 'Not found'
      }, { status: 404 })
    }

    await prismaClient.contact.delete({
      where: {
        id: params.contactId
      }
    })

    return NextResponse.json({
      statusCode: 200,
      message: 'Success delete'
    }, { status: 200 })
  } catch (err) {
    const error = err as { message: string }
    return NextResponse.json({
      statusCode: 500,
      message: error.message ?? 'Failed'
    }, { status: 500 })
  }
}
