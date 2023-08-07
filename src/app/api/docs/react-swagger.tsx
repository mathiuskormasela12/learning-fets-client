'use client'

import React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

interface Props {
  spec: Record<string, any>
}

const ReactSwagger: React.FC<Props> = ({ spec }) => {
  return <SwaggerUI spec={spec} />
}

export default ReactSwagger
