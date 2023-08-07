// ========= Contacts Api
// import all packages
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

/**
 * @swagger
 * /api/contacts:
 *  get:
 *    title: Get Contacts
 *    description: Get All Contacts
 *    tags:
 *      - Contact
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
 *                  default: 200
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        default: eacabaca-0d5b-41ec-92d2-d698c7f20852
 *                      contact_name:
 *                        default: Jhon Doe
 *                        type: string
 *                      email:
 *                        type: string
 *                        default: jhon@gmail.com
 *                      phone_number:
 *                        type: string
 *                        default: 082939393
 *                      created_at:
 *                        type: string
 *                        default: 2023-08-07T09:56:36.481Z
 *                      updated_at:
 *                        type: string
 *                        default: 2023-08-07T09:56:36.481Z
 */
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
