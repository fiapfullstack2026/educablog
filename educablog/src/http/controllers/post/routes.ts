import express from 'express'
import { list } from './list'
import { get } from './get'
import { search } from './search'
import { create } from './create'
import { update } from './update'
import { remove } from './remove'
import { authenticate, authorize } from '../../middleware/jwt-validate'

export const routerPosts = express.Router()

routerPosts.get('/search', search)
routerPosts.get('/', list)
routerPosts.get('/:id', get)
routerPosts.post('/', authenticate, authorize, create)
routerPosts.put('/:id', authenticate, authorize, update)
routerPosts.delete('/:id', authenticate, authorize, remove)
