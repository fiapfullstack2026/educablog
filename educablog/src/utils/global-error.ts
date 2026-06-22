/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { Error as MongooseError } from 'mongoose'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found-error'

interface HttpError extends Error {
  statusCode: number
  expose: boolean
  type?: string
}

function isHttpError(err: unknown): err is HttpError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'statusCode' in err &&
    'expose' in err &&
    (err as HttpError).expose === true
  )
}

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
      message: err.message,
    })
  }

  if (err instanceof MongooseError.CastError) {
    return res.status(400).json({
      message: 'ID inválido',
    })
  }

  if (isHttpError(err)) {
    return res.status(err.statusCode).json({
      message:
        err.type === 'entity.parse.failed'
          ? 'JSON inválido no corpo da requisição'
          : err.message,
    })
  }

  console.error(err)

  return res.status(500).json({
    message: 'Erro interno do servidor',
  })
}
