import { IPost } from '../entities/models/post.interface'
import { IPostRepository } from '../repositories/post.repository.interface'

export class ListPostsUseCase {
  constructor(private repository: IPostRepository) {}

  async handler(): Promise<IPost[]> {
    return this.repository.findAll()
  }
}