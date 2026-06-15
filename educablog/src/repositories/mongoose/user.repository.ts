import mongoose from 'mongoose'
import { IUser } from '../../entities/models/user.interface'
import { IUserRepository } from '../user.repository.interface'
import { userSchema } from '../../entities/user.schema'

const UserModel = mongoose.model<IUser>('User', userSchema)

export class UserRepository implements IUserRepository {
  async signIn(username: string): Promise<IUser | undefined> {
    return await this.findByUsername(username)
  }

  async findByUsername(username: string): Promise<IUser | undefined> {
    return (await UserModel.findOne({ username }).lean()) || undefined
  }

  async create(user: IUser): Promise<IUser> {
    return (await new UserModel(user).save()) as unknown as IUser
  }
}
