import express from 'express'
import { globalError } from './middlewares/global-error'
import { routerPosts } from './http/controllers/post/routes'
import { routerUser } from './http/controllers/user/routes'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './docs/swagger'

export const app = express()

app.use(express.json())

app.use('/posts', routerPosts)
app.use('/user', routerUser)

app.use(globalError)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
