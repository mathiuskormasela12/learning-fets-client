import { getApiDocs } from '@/helpers/swagger'
import ReactSwagger from './react-swagger'
import React from 'react'

const IndexPage: React.FC = async () => {
  const spec = await getApiDocs()
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  )
}

export default IndexPage
