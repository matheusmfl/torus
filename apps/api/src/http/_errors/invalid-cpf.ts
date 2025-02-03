export class InvalidCpfError extends Error {
  constructor(message?: string) {
    super(message ?? 'CPF inválido.')
  }
}
