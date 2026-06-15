import express from 'express'
import { globalError } from './middlewares/global-error'
import { router } from './http/controllers/post/routes'

export const app = express()

app.use(express.json())

app.use('/post', router)

app.use(globalError)
