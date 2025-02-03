export class NotFoundError extends Error {
  constructor(message?: string) {
    super(
      message ??
        'O que você buscou, não foi encontrado na nossa base de dados.',
    )
  }
}
