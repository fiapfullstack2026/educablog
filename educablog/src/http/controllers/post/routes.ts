import express from 'express'
import { list } from './list'
import { get } from './get'
import { search } from './search'
import { create } from './create'
import { update } from './update'
import { remove } from './remove'
import { authenticate, authorize } from '../../middleware/jwt-validate'

export const routerPosts = express.Router()

routerPosts.use(authenticate)
routerPosts.get('/search', search)
routerPosts.get('/', authorize, list)
routerPosts.get('/:id', get)
routerPosts.post('/', authorize, create)
routerPosts.put('/:id', authorize, update)
routerPosts.delete('/:id', authorize, remove)
