import { ICategory } from './category.interface'

export interface IPost {
  title: string
  category: ICategory[]
  content: string
  professor: string
  createdAt?: Date
  updatedAt?: Date
}
