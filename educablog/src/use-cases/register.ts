import bcrypt from 'bcryptjs'
import { IUser } from '../entities/models/user.interface'
import { IUserRepository } from '../repositories/user.repository.interface'

export class RegisterUseCase {
  constructor(private repository: IUserRepository) {}

  async handler(user: IUser): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(user.password, 10)

    return this.repository.create({
      ...user,
      password: hashedPassword,
    })
  }
}
