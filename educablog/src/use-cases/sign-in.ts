import { IUser } from '../entities/models/user.interface'
import { IUserRepository } from '../repositories/user.repository.interface'

export class SignInUseCase {
  constructor(private repository: IUserRepository) {}

  async handler(username: string): Promise<IUser | undefined> {
    const user = await this.repository.signIn(username)

    if (user) return user
  }
}
