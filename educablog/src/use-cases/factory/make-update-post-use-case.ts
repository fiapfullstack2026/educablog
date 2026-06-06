import { PostRepository } from '../../repositories/mongoose/post.repository'
import { UpdatePostUseCase } from '../update-post'

export function makeUpdatePostUseCase() {
  const postRepository = new PostRepository()
  const makeUpdatePostUseCase = new UpdatePostUseCase(postRepository)

  return makeUpdatePostUseCase
}
