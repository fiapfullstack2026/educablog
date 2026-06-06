import { Request, Response } from 'express'
import z from 'zod'
import { makeCreatePostUseCase } from '../../../use-cases/factory/make-create-post-use-case'

export async function create(req: Request, resp: Response) {
  const registerBodySchema = z.object({
    title: z.string(),
    category: z.array(z.object({ name: z.string() })),
    content: z.string(),
    professor: z.string(),
  })

  const { title, category, content, professor } = registerBodySchema.parse(
    req.body,
  )

  const createPostUseCase = makeCreatePostUseCase()
  await createPostUseCase.handler({
    title,
    category,
    content,
    professor,
  })

  return resp.status(201).send()
}
