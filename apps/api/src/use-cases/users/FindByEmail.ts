import { NotFoundError } from '@/http/_errors/not-found-error'
import { UserRepository } from '@/repositories/user-repository'

export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundError('Usuário com esse e-mail não encontrado')
    }

    return { user }
  }
}
