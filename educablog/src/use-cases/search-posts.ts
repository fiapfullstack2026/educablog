import { IPost } from '../entities/models/post.interface'
import { IPostRepository } from '../repositories/post.repository.interface'

export class SearchPostsUseCase {
  constructor(private repository: IPostRepository) {}

  async handler(keyword: string): Promise<IPost[]> {
    return this.repository.search(keyword)
  }
}
