import { IPost } from '../entities/models/post.interface'

export interface IPostRepository {
  create(post: IPost): Promise<IPost | null>
  update(id: string, post: IPost): Promise<IPost | null>
}
