import { type openapi } from '@/open-api/openapi-spec'
import { type ClientPlugin, createClient, type NormalizeOAS } from 'fets'

// Create Client
// The open api spec should be an javascript object, because Typescript can't infer json
export const client = createClient<NormalizeOAS<typeof openapi>>({
  endpoint: process.env.NEXT_PUBLIC_API_URL,
  plugins: [parseJsonResponse()]
})

function parseJsonResponse (): ClientPlugin {
  return {
    onFetch ({ fetchFn, setFetchFn }) {
      setFetchFn(async (input, init) => {
        const response = await fetchFn(input, init)

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (response.headers.get('content-type')?.startsWith('application/json')) {
          console.log('KESINI')
          return await response.json()
        }

        return response
      })
    }
  }
}
