// ========= Contact Api
// import all packages
import { NextResponse, type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

/**
 * @swagger
 * /api/contact/{contactId}:
 *  get:
 *    description: Get Contact By Id
 *    tags:
 *      - Contact
 *    summary: Get Contact
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: integer
 *                  format: int32
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    contact_name:
 *                      type: string
 *                    email:
 *                      type: string
 *                    phone_number:
 *                      type: string
 *                    created_at:
 *                      type: string
 *                    updated_at:
 *                      type: string
 *    parameters:
 *      - name: contactId
 *        in: path
 *        schema:
 *          type: string
 */
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

/**
 * @swagger
 * /api/contact/{contactId}:
 *  put:
 *    tags:
 *      - Contact
 *    description: Update Contact
 *    summary: Update Contact
 *    parameters:
 *      - name: contactId
 *        in: path
 *        type: string
 *        description: Contact Id
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: integer
 *                  format: int32
 *                  default: 201
 *                message:
 *                  type: string
 *                  default: Update Success
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              contact_name:
 *                type: string
 *                default: Jhon Doe
 *              email:
 *                type: string
 *                default: email
 *              phone_number:
 *                type: string
 *                default: 0892028292
 */
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
    const result = await prismaClient.contact.findUnique({
      where: {
        id: params.contactId
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

/**
 * @swagger
 * /api/contact/{contactId}:
 *  delete:
 *    tags:
 *      - Contact
 *    summary: Delete Contact
 *    description: Delete Contact
 *    parameters:
 *      - name: contactId
 *        type: string
 *        in: path
 *        description: Contact Id
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: string
 *                  default: 200
 *                message:
 *                  type: string
 */
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
