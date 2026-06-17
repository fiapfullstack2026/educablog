import z from 'zod'
import { Request, Response } from 'express'
import { makeUpdatePostUseCase } from '../../../use-cases/factory/make-update-post-use-case'

export async function update(req: Request, resp: Response) {
  const registerBodySchema = z.object({
    title: z.string(),
    discipline: z.string(),
    content: z.string(),
    teacher: z.string(),
  })

  const registerParamSchema = z.object({ id: z.string() })

  const { title, discipline, content, teacher } = registerBodySchema.parse(
    req.body,
  )

  const { id } = registerParamSchema.parse(req.params)

  const updatePostUseCase = makeUpdatePostUseCase()
  await updatePostUseCase.handler(id, {
    title,
    discipline,
    content,
    teacher,
  })

  return resp.status(200).send()
}
