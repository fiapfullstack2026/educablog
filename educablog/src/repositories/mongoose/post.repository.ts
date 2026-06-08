import mongoose from 'mongoose'
import { IPostRepository } from '../post.repository.interface'
import { IPost } from '../../entities/models/post.interface'
import { ICategory } from '../../entities/models/category.interface'
import { postSchema } from '../../entities/post.schema'
import { ICategoryRepository } from '../category.repository.interface'
import { CategoryRepository } from './category.repository'

const PostModel = mongoose.model('Post', postSchema)

export class PostRepository implements IPostRepository {
  private categoryRepository: ICategoryRepository
  constructor() {
    this.categoryRepository = new CategoryRepository()
  }

  private async resolveCategoryIds(
    categories: ICategory[],
  ): Promise<mongoose.Types.ObjectId[]> {
    return Promise.all(
      categories.map(async (item) => {
        const { name } = item as ICategory
        const cat = await this.categoryRepository.getOrCreate(name)
        return cat._id
      }),
    )
  }

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
    const categoryIds = await this.resolveCategoryIds(post.category)
    const created = await new PostModel({
      ...post,
      category: categoryIds,
    }).save()

    return (await PostModel.findById(created._id)
      .populate('category', 'name')
      .lean()) as IPost | null
  }

  async update(id: string, post: IPost): Promise<IPost | null> {
    const categoryIds = await this.resolveCategoryIds(post.category)
    const now = Date.now()
    return (await PostModel.findByIdAndUpdate(
      id,
      { ...post, category: categoryIds, updatedAt: now },
      {
        returnDocument: 'after',
      },
    )
      .populate('category', 'name')
      .lean()) as IPost | null
  }

  async delete(id: string): Promise<IPost | null> {
    return (await PostModel.findByIdAndDelete(id).lean()) as IPost | null
  }
}
