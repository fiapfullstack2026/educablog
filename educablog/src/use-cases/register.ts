import bcrypt from 'bcryptjs'
import { IUser } from '../entities/models/user.interface'
import { IUserRepository } from '../repositories/user.repository.interface'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

export class RegisterUseCase {
  constructor(private repository: IUserRepository) {}

  async handler(user: IUser): Promise<IUser> {
    const isTeacher = user.isTeacher ?? false

    const existingUser = await this.repository.findByUsernameAndRole(
      user.username,
      isTeacher,
    )

    if (existingUser !== undefined) {
      throw new UserAlreadyExistsError()
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)

    return this.repository.create({
      ...user,
      isTeacher,
      password: hashedPassword,
    })
  }
}
