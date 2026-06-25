import { Request, Response } from 'express'
import z from 'zod'
import { makeDeletePostUseCase } from '../../../use-cases/factory/make-delete-post-use-case'

export async function remove(req: Request, res: Response) {
  const paramsSchema = z.object({ id: z.string() })
  const { id } = paramsSchema.parse(req.params)

  const deletePostUseCase = makeDeletePostUseCase()
  const post = await deletePostUseCase.handler(id)

  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: 'Post não encontrado' })
  }

  return res.status(204).send()
}
