export class DuplicatedData extends Error {
  constructor(message?: string) {
    super(
      message ?? 'Error de documento duplicado, por favor, entrar em contato',
    )
  }
}
