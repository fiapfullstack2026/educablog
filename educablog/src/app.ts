import express from 'express'
import cors from 'cors'
import { globalError } from './utils/global-error'
import { routerPosts } from './http/controllers/post/routes'
import { routerUser } from './http/controllers/user/routes'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './docs/swagger'

export const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.redirect('/docs')
})

app.use('/posts', routerPosts)
app.use('/user', routerUser)

app.use(globalError)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
