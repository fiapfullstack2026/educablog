export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Usuário com este username e perfil já existe')
  }
}
