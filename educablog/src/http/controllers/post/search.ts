import { Request, Response } from 'express'
import z from 'zod'
import { makeSearchPostsUseCase } from '../../../use-cases/factory/make-search-posts-use-case'

export async function search(req: Request, res: Response) {
  const querySchema = z.object({
    q: z.string().min(1, 'O parâmetro de busca "q" é obrigatório'),
  })

  const { q } = querySchema.parse(req.query)

  const searchPostsUseCase = makeSearchPostsUseCase()
  const posts = await searchPostsUseCase.handler(q)

  return res
    .status(200)
    .json({ success: true, count: posts.length, data: posts })
}
