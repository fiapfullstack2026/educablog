import { describe, it, expect, vi } from 'vitest'
import { ListPostsUseCase } from '../../use-cases/list-posts'

describe('ListPostsUseCase', () => {
  it('deve listar posts', async () => {
    const repository = {
      findAll: vi.fn().mockResolvedValue([{ id: '1', title: 'Post 1' }]),
    }

    const sut = new ListPostsUseCase(repository as never)
    const posts = await sut.handler()

    expect(posts).toHaveLength(1)
    expect(repository.findAll).toHaveBeenCalled()
  })
})
