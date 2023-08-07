import { createSwaggerSpec } from 'next-swagger-doc'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api', // define api folder under app folder
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Contact Management',
        version: '1.0'
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      security: []
    }
  })
  return spec
}
