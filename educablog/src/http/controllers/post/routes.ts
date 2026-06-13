import express from 'express'
import { list } from './list'
import { get } from './get'
import { search } from './search'
import { create } from './create'
import { update } from './update'
import { remove } from './remove'

export const routerPosts = express.Router()

routerPosts.get('/search', search)

routerPosts.get('/', list)
routerPosts.get('/:id', get)
routerPosts.post('/', create)
routerPosts.put('/:id', update)
routerPosts.delete('/:id', remove)
