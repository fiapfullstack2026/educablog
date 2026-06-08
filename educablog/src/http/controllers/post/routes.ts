import express from 'express'
import { list } from './list'
import { get } from './get'
import { search } from './search'
import { create } from './create'
import { update } from './update'
import { remove } from './remove'

export const router = express.Router()

router.get('/search', search)

router.get('/', list)
router.get('/:id', get)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)
