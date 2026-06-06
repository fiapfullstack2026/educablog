import express from 'express'
import { create } from './create'
import { update } from './update'

export const router = express.Router()

router.post('/', create)
router.put('/:id', update)
