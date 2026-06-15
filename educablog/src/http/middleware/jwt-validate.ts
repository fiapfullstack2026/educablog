import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ success: false, message: 'Token não informado' })
  }

  const token = authHeader.split(' ')[1]
  const jwtSecret = process.env.JWT_SECRET || 'dev-secret'

  try {
    res.locals.user = jwt.verify(token, jwtSecret) as { isProfessor: boolean }
    next()
  } catch {
    return res
      .status(401)
      .send({ success: false, message: 'Token inválido ou expirado' })
  }
}

export function authorize(_req: Request, res: Response, next: NextFunction) {
  if (!res.locals.user?.isProfessor) {
    return res
      .status(403)
      .send({ success: false, message: 'Acesso restrito a professores' })
  }
  next()
}
