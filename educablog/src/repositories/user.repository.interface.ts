import { IUser } from '../entities/models/user.interface'

export interface IUserRepository {
  create(user: IUser): Promise<IUser>
  findByUsername(username: string): Promise<IUser | undefined>
  findByUsernameAndRole(
    username: string,
    isTeacher: boolean,
  ): Promise<IUser | undefined>
  signIn(username: string): Promise<IUser | undefined>
}
