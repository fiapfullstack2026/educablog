import { IPost } from '../entities/models/post.interface'
import { IPostRepository } from '../repositories/post.repository.interface'

export class GetPostUseCase {
  constructor(private repository: IPostRepository) {}

  async handler(id: string): Promise<IPost | null> {
    return this.repository.findById(id)
  }
}