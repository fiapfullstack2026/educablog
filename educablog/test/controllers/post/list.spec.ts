import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Request, Response } from 'express'
import { list } from '../../../src/http/controllers/post/list'

const mockHandler = vi.hoisted(() => vi.fn())

vi.mock('../../../src/use-cases/factory/make-list-posts-use-case', () => ({
  makeListPostsUseCase: () => ({ handler: mockHandler }),
}))

const makeRes = () => {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  }

  return res as unknown as Response & typeof res
}

describe('GET /posts', () => {
  beforeEach(() => mockHandler.mockReset())

  it('deve listar posts com sucesso', async () => {
    const posts = [
      { id: '1', title: 'Post 1' },
      { id: '2', title: 'Post 2' },
    ]

    mockHandler.mockResolvedValue(posts)

    const req = {} as Request
    const res = makeRes()

    await list(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      count: 2,
      data: posts,
    })
  })
})
