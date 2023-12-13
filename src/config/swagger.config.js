import swaggerJSDoc from 'swagger-jsdoc'
import __dirname from '../utils.js'

const swaggerOptions = {
    definition: {
      openapi: '3.0.1',
      info: {
        title: 'API final project',
        description: 'API for CoderHouse final project'
      }
    },
    apis: [`${__dirname}/docs/**/*.yml`]
  }

export const specs = swaggerJSDoc(swaggerOptions)