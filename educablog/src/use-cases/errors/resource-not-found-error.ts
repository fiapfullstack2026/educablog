export class ResourceNotFoundError extends Error {
  constructor() {
    super('Post não encontrado')
  }
}
