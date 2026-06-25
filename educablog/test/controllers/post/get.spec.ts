import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Request, Response } from 'express'
import { get } from '../../../src/http/controllers/post/get'

const mockHandler = vi.hoisted(() => vi.fn())

vi.mock('../../../src/use-cases/factory/make-get-post-use-case', () => ({
  makeGetPostUseCase: () => ({ handler: mockHandler }),
}))

const makeRes = () => {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  }

  return res as unknown as Response & typeof res
}

describe('GET /posts/:id', () => {
  beforeEach(() => mockHandler.mockReset())

  it('deve retornar um post pelo id', async () => {
    const post = {
      id: '1',
      title: 'Post teste',
    }

    mockHandler.mockResolvedValue(post)

    const req = {
      params: { id: '1' },
    } as unknown as Request

    const res = makeRes()

    await get(req, res)

    expect(mockHandler).toHaveBeenCalledWith('1')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: post,
    })
  })
})
