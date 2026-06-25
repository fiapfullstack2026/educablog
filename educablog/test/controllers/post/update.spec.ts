import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import { update } from '../../../src/http/controllers/post/update'

const mockHandler = vi.hoisted(() => vi.fn())

vi.mock('../../../src/use-cases/factory/make-update-post-use-case', () => ({
  makeUpdatePostUseCase: () => ({ handler: mockHandler }),
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

const validParams = { id: 'post-id-123' }

describe('PUT /post/:id — update controller', () => {
  beforeEach(() => mockHandler.mockReset())

  it('retorna 200 e chama handler com id e corpo validado com sucesso', async () => {
    mockHandler.mockResolvedValue(undefined)
    const req = { body: validBody, params: validParams } as unknown as Request
    const res = makeRes()

    await update(req, res)

    expect(mockHandler).toHaveBeenCalledWith(validParams.id, validBody)
    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.send).toHaveBeenCalledWith()
  })

  it('retorna ZodError quando title não foi enviado', async () => {
    const req = {
      body: {
        discipline: validBody.discipline,
        content: validBody.content,
        teacher: validBody.teacher,
      },
      params: validParams,
    } as unknown as Request
    const res = makeRes()

    await expect(update(req, res)).rejects.toBeInstanceOf(ZodError)
    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('retorna ZodError quando discipline não foi enviada', async () => {
    const req = {
      body: {
        title: validBody.title,
        content: validBody.content,
        teacher: validBody.teacher,
      },
      params: validParams,
    } as unknown as Request
    const res = makeRes()

    await expect(update(req, res)).rejects.toBeInstanceOf(ZodError)
    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('retorna ZodError quando content não foi enviado', async () => {
    const req = {
      body: {
        title: validBody.title,
        discipline: validBody.discipline,
        teacher: validBody.teacher,
      },
      params: validParams,
    } as unknown as Request
    const res = makeRes()

    await expect(update(req, res)).rejects.toBeInstanceOf(ZodError)
    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('retorna ZodError quando teacher não foi enviado', async () => {
    const req = {
      body: {
        title: validBody.title,
        discipline: validBody.discipline,
        content: validBody.content,
      },
      params: validParams,
    } as unknown as Request
    const res = makeRes()

    await expect(update(req, res)).rejects.toBeInstanceOf(ZodError)
    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('retorna ZodError quando id não foi enviado nos params', async () => {
    const req = {
      body: validBody,
      params: {},
    } as unknown as Request
    const res = makeRes()

    await expect(update(req, res)).rejects.toBeInstanceOf(ZodError)
    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('retorna ZodError quando corpo está vazio', async () => {
    const req = {
      body: {},
      params: validParams,
    } as unknown as Request
    const res = makeRes()

    await expect(update(req, res)).rejects.toBeInstanceOf(ZodError)
    expect(mockHandler).not.toHaveBeenCalled()
  })
})
