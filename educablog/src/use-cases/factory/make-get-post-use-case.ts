import { PostRepository } from '../../repositories/mongoose/post.repository'
import { GetPostUseCase } from '../get-post'

export function makeGetPostUseCase() {
  return new GetPostUseCase(new PostRepository())
}
