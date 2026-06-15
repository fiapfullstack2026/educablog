import { UserRepository } from '../../repositories/mongoose/user.repository'
import { SignInUseCase } from '../sign-in'

export function makeSignInUseCase() {
  const userRepository = new UserRepository()
  const makeSignInUseCase = new SignInUseCase(userRepository)

  return makeSignInUseCase
}
