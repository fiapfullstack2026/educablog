/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { Error as MongooseError } from 'mongoose'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found-error'

export function globalError(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Erro de validação',
      errors: err.format(),
    })
  }

  if (err instanceof ResourceNotFoundError) {
    return res.status(404).json({
      message: 'Post não encontrado',
    })
  }

  if (err instanceof MongooseError.CastError) {
    return res.status(400).json({
      message: 'ID inválido',
    })
  }

  console.error(err)

  return res.status(500).json({
    message: 'Erro interno do servidor',
  })
}
