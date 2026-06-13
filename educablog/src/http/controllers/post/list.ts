import { Request, Response } from 'express'
import { makeListPostsUseCase } from '../../../use-cases/factory/make-list-posts-use-case'

export async function list(_req: Request, res: Response) {
  const listPostsUseCase = makeListPostsUseCase()
  const posts = await listPostsUseCase.handler()
  return res
    .status(200)
    .json({ success: true, count: posts.length, data: posts })
}
