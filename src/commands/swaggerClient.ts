/* eslint-disable @typescript-eslint/no-var-requires */
// =========== Swagger Client Codegen
// import all modules
const path = require('path')
const { writeFileSync } = require('fs')
const { execSync } = require('child_process')
const http = require('http')

async function main (): Promise<void> {
  // let json = await fetch('http://localhost:3000/api/oas-internal')
  // json = await json.json()

  const res = http.request('http://localhost:3000/api/oas-internal', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }, (response: any) => {
    response.addListener('data', (data: any) => {
      const template = `
      export const openapi = ${JSON.stringify(JSON.parse(data.toString()) ?? {}, null, 2)} as const;
    `
      const filepath = path.join(__dirname, '../open-api/openapi-spec.ts')
      writeFileSync(filepath, template)
      execSync('npx yarn lint --fix')
    })
  })

  res.end()
}

main()
