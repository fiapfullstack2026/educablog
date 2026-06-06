import z from 'zod'
import { Request, Response } from 'express'
import { makeUpdatePostUseCase } from '../../../use-cases/factory/make-update-post-use-case'

export async function update(req: Request, resp: Response) {
  const registerBodySchema = z.object({
    title: z.string(),
    category: z.array(z.object({ name: z.string() })),
    content: z.string(),
    professor: z.string(),
  })

  const registerParamSchema = z.object({ id: z.string() })

  const { title, category, content, professor } = registerBodySchema.parse(
    req.body,
  )

  const { id } = registerParamSchema.parse(req.params)

  const updatePostUseCase = makeUpdatePostUseCase()
  await updatePostUseCase.handler(id, {
    title,
    category,
    content,
    professor,
  })

  return resp.status(200).send()
}
