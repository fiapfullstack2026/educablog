import { PostRepository } from '../../repositories/mongoose/post.repository'
import { DeletePostUseCase } from '../delete-post'

export function makeDeletePostUseCase() {
  return new DeletePostUseCase(new PostRepository())
}