import { IPost } from '../entities/models/post.interface'

export interface IPostRepository {
  findAll(): Promise<IPost[]>
  findById(id: string): Promise<IPost | null>
  search(keyword: string): Promise<IPost[]>
  create(post: IPost): Promise<IPost | null>
  update(id: string, post: Partial<IPost>): Promise<IPost | null>
  delete(id: string): Promise<IPost | null>
}
