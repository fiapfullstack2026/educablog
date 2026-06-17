import { Request, Response } from 'express'
import z from 'zod'
import { makeCreatePostUseCase } from '../../../use-cases/factory/make-create-post-use-case'

export async function create(req: Request, resp: Response) {
  const registerBodySchema = z.object({
    title: z.string(),
    discipline: z.string(),
    content: z.string(),
    teacher: z.string(),
  })

  const { title, discipline, content, teacher } = registerBodySchema.parse(
    req.body,
  )

  const createPostUseCase = makeCreatePostUseCase()
  await createPostUseCase.handler({
    title,
    discipline,
    content,
    teacher,
  })

  return resp.status(201).send()
}
