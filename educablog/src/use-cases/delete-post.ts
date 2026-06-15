import { IPost } from '../entities/models/post.interface'
import { IPostRepository } from '../repositories/post.repository.interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class DeletePostUseCase {
  constructor(private repository: IPostRepository) {}

  async handler(id: string): Promise<IPost> {
    const post = await this.repository.delete(id)

    if (!post) {
      throw new ResourceNotFoundError()
    }

    return post
  }
}
