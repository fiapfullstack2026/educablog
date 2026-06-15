import { UserRepository } from '../../repositories/mongoose/user.repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const userRepository = new UserRepository()
  const makeRegisterUseCase = new RegisterUseCase(userRepository)

  return makeRegisterUseCase
}
