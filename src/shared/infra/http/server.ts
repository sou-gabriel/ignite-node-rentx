import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import '@shared/container'

import { AppError } from '@shared/errors/AppError'

import swaggerDocument from '../../../swagger.json'
import createConnection from '../typeorm'
import { router } from './routes'

createConnection()
const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message:
      error.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Interval server error - ${error.message}`
  })
})

app.listen(3333, () => {
  console.log('Server is running! 🏃')
})
