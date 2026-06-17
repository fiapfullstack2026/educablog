import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import { create } from '../../../http/controllers/post/create'

const mockHandler = vi.hoisted(() => vi.fn())

vi.mock('../../../use-cases/factory/make-create-post-use-case', () => ({
  makeCreatePostUseCase: () => ({ handler: mockHandler }),
}))

const makeRes = () => {
  const res = { status: vi.fn().mockReturnThis(), send: vi.fn() }
  return res as unknown as Response & typeof res
}

const validBody = {
  title: 'Grafos',
  discipline: 'Estrutura de Dados',
  content: 'Algo sobre caixeiro viajante.',
  teacher: 'Prof. Ada',
}

describe('POST /post — create controller', () => {
  beforeEach(() => mockHandler.mockReset())

  it('retorna 201 e chama handler com corpo validado com sucesso', async () => {
    mockHandler.mockResolvedValue(undefined)
    const req = { body: validBody } as Request
    const res = makeRes()

    await create(req, res)

    expect(mockHandler).toHaveBeenCalledWith(validBody)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.send).toHaveBeenCalledWith()
  })

  it('retorna ZodError quando title não foi enviado', async () => {
    const req = {
      body: {
        discipline: validBody.discipline,
        content: validBody.content,
        teacher: validBody.teacher,
      },
    } as Request
    const res = makeRes()

    await expect(create(req, res)).rejects.toBeInstanceOf(ZodError)
    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('retorna ZodError quando discipline não foi enviada', async () => {
    const req = {
      body: {
        title: validBody.title,
        content: validBody.content,
        teacher: validBody.teacher,
      },
    } as Request
    const res = makeRes()

    await expect(create(req, res)).rejects.toBeInstanceOf(ZodError)
    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('retorna ZodError quando content não foi enviado', async () => {
    const req = {
      body: {
        title: validBody.title,
        discipline: validBody.discipline,
        teacher: validBody.teacher,
      },
    } as Request
    const res = makeRes()

    await expect(create(req, res)).rejects.toBeInstanceOf(ZodError)
    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('retorna ZodError quando professor não foi enviado', async () => {
    const req = {
      body: {
        title: validBody.title,
        discipline: validBody.discipline,
        content: validBody.content,
      },
    } as Request
    const res = makeRes()

    await expect(create(req, res)).rejects.toBeInstanceOf(ZodError)
    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('retorna ZodError quando corpo está vazio', async () => {
    const req = { body: {} } as Request
    const res = makeRes()

    await expect(create(req, res)).rejects.toBeInstanceOf(ZodError)
    expect(mockHandler).not.toHaveBeenCalled()
  })
})
