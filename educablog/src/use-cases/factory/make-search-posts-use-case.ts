import { PostRepository } from '../../repositories/mongoose/post.repository'
import { SearchPostsUseCase } from '../search-posts'

export function makeSearchPostsUseCase() {
  return new SearchPostsUseCase(new PostRepository())
}