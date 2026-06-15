import express from 'express'
import { globalError } from './middlewares/global-error'
import { router } from './http/controllers/post/routes'
import swaggerUi from 'swagger-ui-express'           
import { swaggerDocument } from './docs/swagger'

export const app = express()

app.use(express.json())

app.use('/post', router)

app.use(globalError)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))  
