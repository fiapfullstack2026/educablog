import { Request, Response } from 'express'
import z from 'zod'
import { makeGetPostUseCase } from '../../../use-cases/factory/make-get-post-use-case'

export async function get(req: Request, res: Response) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id } = paramsSchema.parse(req.params)

  const getPostUseCase = makeGetPostUseCase()

  const post = await getPostUseCase.handler(id)

  return res.status(200).json({
    success: true,
    data: post,
  })
}
