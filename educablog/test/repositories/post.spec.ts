import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PostRepository } from '../../repositories/mongoose/post.repository'
import { IPost } from '../../entities/models/post.interface'

const mockLean = vi.hoisted(() => vi.fn())
const mockSort = vi.hoisted(() => vi.fn(() => ({ lean: mockLean })))
const mockSave = vi.hoisted(() => vi.fn())
const mockPostModelInstance = vi.hoisted(() => ({ save: mockSave }))

const mockFind = vi.hoisted(() => vi.fn(() => ({ sort: mockSort })))
const mockFindById = vi.hoisted(() => vi.fn(() => ({ lean: mockLean })))
const mockFindByIdAndUpdate = vi.hoisted(() =>
  vi.fn(() => ({ lean: mockLean })),
)
const mockFindByIdAndDelete = vi.hoisted(() =>
  vi.fn(() => ({ lean: mockLean })),
)

vi.mock('mongoose', async (importOriginal) => {
  const actual = await importOriginal<typeof import('mongoose')>()
  return {
    ...actual,
    default: {
      ...actual.default,
      model: vi.fn(() => {
        return Object.assign(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          vi.fn(function () {
            return mockPostModelInstance
          } as any),
          {
            find: mockFind,
            findById: mockFindById,
            findByIdAndUpdate: mockFindByIdAndUpdate,
            findByIdAndDelete: mockFindByIdAndDelete,
          },
        )
      }),
      Schema: actual.default.Schema,
    },
  }
})

const post: IPost = {
  title: 'Grafos',
  discipline: 'Estrutura de Dados',
  content: 'Algo sobre caixeiro viajante.',
  teacher: 'Prof. Ada',
}

const savedPost = { ...post, _id: 'post-id-123' }

describe('PostRepository', () => {
  let repository: PostRepository

  beforeEach(() => {
    vi.clearAllMocks()
    repository = new PostRepository()
  })

  describe('findAll', () => {
    it('retorna lista de posts ordenados por createdAt desc', async () => {
      mockLean.mockResolvedValue([savedPost])

      const result = await repository.findAll()

      expect(mockFind).toHaveBeenCalledWith()
      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 })
      expect(result).toEqual([savedPost])
    })

    it('retorna lista vazia quando não há posts', async () => {
      mockLean.mockResolvedValue([])

      const result = await repository.findAll()

      expect(result).toEqual([])
    })
  })

  describe('findById', () => {
    it('retorna post quando id existe', async () => {
      mockLean.mockResolvedValue(savedPost)

      const result = await repository.findById('post-id-123')

      expect(mockFindById).toHaveBeenCalledWith('post-id-123')
      expect(result).toEqual(savedPost)
    })

    it('retorna null quando id não existe', async () => {
      mockLean.mockResolvedValue(null)

      const result = await repository.findById('id-inexistente')

      expect(result).toBeNull()
    })
  })

  describe('search', () => {
    it('busca posts por keyword em title e content', async () => {
      mockLean.mockResolvedValue([savedPost])

      const result = await repository.search('grafos')

      expect(mockFind).toHaveBeenCalledWith({
        $or: [{ title: expect.any(RegExp) }, { content: expect.any(RegExp) }],
      })
      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 })
      expect(result).toEqual([savedPost])
    })

    it('retorna lista vazia quando keyword não encontrada', async () => {
      mockLean.mockResolvedValue([])

      const result = await repository.search('inexistente')

      expect(result).toEqual([])
    })
  })

  describe('create', () => {
    it('salva e retorna o post criado', async () => {
      mockSave.mockResolvedValue({ _id: 'post-id-123' })
      mockLean.mockResolvedValue(savedPost)

      const result = await repository.create(post)

      expect(mockSave).toHaveBeenCalled()
      expect(mockFindById).toHaveBeenCalledWith('post-id-123')
      expect(result).toEqual(savedPost)
    })

    it('retorna null quando findById não encontra o post após salvar', async () => {
      mockSave.mockResolvedValue({ _id: 'post-id-123' })
      mockLean.mockResolvedValue(null)

      const result = await repository.create(post)

      expect(result).toBeNull()
    })
  })

  describe('update', () => {
    it('atualiza e retorna o post modificado', async () => {
      const updatedPost = { ...savedPost, title: 'Novo título' }
      mockLean.mockResolvedValue(updatedPost)

      const result = await repository.update('post-id-123', {
        ...post,
        title: 'Novo título',
      })

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        'post-id-123',
        expect.objectContaining({ title: 'Novo título' }),
        { returnDocument: 'after' },
      )
      expect(result).toEqual(updatedPost)
    })

    it('retorna null quando id não existe', async () => {
      mockLean.mockResolvedValue(null)

      const result = await repository.update('id-inexistente', post)

      expect(result).toBeNull()
    })
  })

  describe('delete', () => {
    it('remove e retorna o post deletado', async () => {
      mockLean.mockResolvedValue(savedPost)

      const result = await repository.delete('post-id-123')

      expect(mockFindByIdAndDelete).toHaveBeenCalledWith('post-id-123')
      expect(result).toEqual(savedPost)
    })

    it('retorna null quando id não existe', async () => {
      mockLean.mockResolvedValue(null)

      const result = await repository.delete('id-inexistente')

      expect(result).toBeNull()
    })
  })
})
