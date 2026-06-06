import { IPost } from '../entities/models/post.interface'
import { IPostRepository } from '../repositories/post.repository.interface'

export class CreatePostUseCase {
  constructor(private repository: IPostRepository) {}
  async handler(post: IPost): Promise<void> {
    this.repository.create(post)
  }
}
