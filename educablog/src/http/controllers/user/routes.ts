import express from 'express'
import { register } from './register'
import { signIn } from './sign-in'

export const routerUser = express.Router()

routerUser.post('/register', register)
routerUser.post('/signin', signIn)
