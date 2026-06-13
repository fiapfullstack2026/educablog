import express from 'express'
import { register } from './register'

export const routerUser = express.Router()

routerUser.post('/register', register)
