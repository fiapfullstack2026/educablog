import mongoose from 'mongoose'
import { ICategoryRepository } from '../category.repository.interface'
import { categorySchema } from '../../entities/category.schema'
import { ICategory } from '../../entities/models/category.interface'

const CategoryModel =
  mongoose.models.Category || mongoose.model('Category', categorySchema)

export class CategoryRepository implements ICategoryRepository {
  async getOrCreate(
    name: string,
  ): Promise<ICategory & { _id: mongoose.Types.ObjectId }> {
    const doc = await CategoryModel.findOneAndUpdate(
      { name },
      { $setOnInsert: { name } },
      { upsert: true, returnDocument: 'after' },
    ).lean()
    return doc as ICategory & { _id: mongoose.Types.ObjectId }
  }

  async update(
    id: string,
    category: ICategory,
  ): Promise<ICategory | undefined> {
    const updated = await CategoryModel.findByIdAndUpdate(id, category, {
      returnDocument: 'after',
    })
    return updated ? (updated.toObject() as ICategory) : undefined
  }
}
