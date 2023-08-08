import { getApiDocs } from '@/helpers/swagger'
import { NextResponse } from 'next/server'

export async function GET (): Promise<NextResponse> {
  const data = await getApiDocs()
  return NextResponse.json(data, {
    status: 200
  })
}
