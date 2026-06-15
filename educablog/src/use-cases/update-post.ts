import { IPost } from '../entities/models/post.interface'
import { IPostRepository } from '../repositories/post.repository.interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class UpdatePostUseCase {
  constructor(private repository: IPostRepository) {}

  async handler(id: string, post: IPost): Promise<IPost> {
    const updatedPost = await this.repository.update(id, post)

    if (!updatedPost) {
      throw new ResourceNotFoundError()
    }

    return updatedPost
  }
}
