import z from 'zod'
import { Request, Response } from 'express'
import { makeRegisterUseCase } from '../../../use-cases/factory/make-register-use-case'

export async function register(req: Request, resp: Response) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
    isTeacher: z.boolean().optional(),
  })

  const { username, password, isTeacher } = registerBodySchema.parse(req.body)

  const registerUseCase = makeRegisterUseCase()
  const user = await registerUseCase.handler({
    username,
    password,
    isTeacher,
  })

  if (user) {
    return resp.status(201).send({
      success: true,
      message: `Usuário ${user.username} criado com sucesso`,
    })
  } else {
    return resp.status(400).send({
      success: false,
      message: 'Não foi possível criar o usuário',
    })
  }
}
