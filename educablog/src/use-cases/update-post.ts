import { IPost } from '../entities/models/post.interface'
import { IPostRepository } from '../repositories/post.repository.interface'

export class UpdatePostUseCase {
  constructor(private repository: IPostRepository) {}
  async handler(id: string, post: IPost): Promise<IPost | null> {
    return this.repository.update(id, post)
  }
}
