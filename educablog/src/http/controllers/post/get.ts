import { Request, Response } from 'express'
import z from 'zod'
import { makeGetPostUseCase } from '../../../use-cases/factory/make-get-post-use-case'

export async function get(req: Request, res: Response) {
    const paramsSchema = z.object({ id: z.string() })
    const { id } = paramsSchema.parse(req.params)

    const getPostUseCase = makeGetPostUseCase()
    const post = await getPostUseCase.handler(id)

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post não encontrado' })
    }

    return res.status(200).json({ success: true, data: post })
}