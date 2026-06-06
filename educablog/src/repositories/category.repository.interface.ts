import mongoose from 'mongoose'
import { ICategory } from '../entities/models/category.interface'

export interface ICategoryRepository {
  getOrCreate(
    name: string,
  ): Promise<ICategory & { _id: mongoose.Types.ObjectId }>
  update(id: string, category: ICategory): Promise<ICategory | undefined>
}
