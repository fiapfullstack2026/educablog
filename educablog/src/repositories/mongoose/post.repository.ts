import mongoose from 'mongoose'
import { IPostRepository } from '../post.repository.interface'
import { IPost } from '../../entities/models/post.interface'
import { postSchema } from '../../entities/post.schema'

const PostModel = mongoose.model('Post', postSchema)

export class PostRepository implements IPostRepository {
  async findAll(): Promise<IPost[]> {
    return (await PostModel.find().sort({ createdAt: -1 }).lean()) as IPost[]
  }

  async findById(id: string): Promise<IPost | null> {
    return (await PostModel.findById(id).lean()) as IPost | null
  }

  async search(keyword: string): Promise<IPost[]> {
    const regex = new RegExp(keyword, 'i')
    return (await PostModel.find({
      $or: [{ title: regex }, { content: regex }],
    })
      .sort({ createdAt: -1 })
      .lean()) as IPost[]
  }

  async create(post: IPost): Promise<IPost | null> {
    const created = await new PostModel(post).save()

    return (await PostModel.findById(created._id).lean()) as IPost | null
  }

  async update(id: string, post: IPost): Promise<IPost | null> {
    const now = Date.now()
    return (await PostModel.findByIdAndUpdate(
      id,
      { ...post, updatedAt: now },
      {
        returnDocument: 'after',
      },
    ).lean()) as IPost | null
  }

  async delete(id: string): Promise<IPost | null> {
    return (await PostModel.findByIdAndDelete(id).lean()) as IPost | null
  }
}
