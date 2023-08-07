import { type openapi } from '@/open-api/openapi-spec'
import { createClient, type NormalizeOAS } from 'fets'

// Create Client
// The open api spec should be an javascript object, because Typescript can't infer json
export const client = createClient<NormalizeOAS<typeof openapi>>({
  endpoint: process.env.NEXT_PUBLIC_API_URL
})
