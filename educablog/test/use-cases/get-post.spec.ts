import { describe, it, expect, vi } from 'vitest'
import { GetPostUseCase } from '../../src/use-cases/get-post'
import { ResourceNotFoundError } from '../../src/use-cases/errors/resource-not-found-error'

describe('GetPostUseCase', () => {
  it('deve retornar um post pelo id', async () => {
    const repository = {
      findById: vi.fn().mockResolvedValue({
        id: '1',
        title: 'Post teste',
      }),
    }

    const sut = new GetPostUseCase(repository as never)

    const post = await sut.handler('1')

    expect(post).toBeDefined()
  })

  it('deve lançar erro quando post não existir', async () => {
    const repository = {
      findById: vi.fn().mockResolvedValue(null),
    }

    const sut = new GetPostUseCase(repository as never)

    await expect(sut.handler('999')).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
