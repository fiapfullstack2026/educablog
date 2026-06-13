import { IUser } from '../entities/models/user.interface'

export interface IUserRepository {
  create(user: IUser): Promise<IUser>
  //findByUsername(username: string): Promise<IUser | undefined>
  //login(user: IUser): Promise<object>
}
