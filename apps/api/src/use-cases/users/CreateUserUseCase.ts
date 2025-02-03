import { Prisma } from '@prisma/client'

import { DuplicatedData } from '@/http/_errors/duplicated-data-error'
import { UserRepository } from '@/repositories/user-repository'

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: Prisma.UserCreateInput) {
    const { email, cpf, name, password } = data
    const userAlreadyExists = await this.userRepository.findByEmail(email)
    if (userAlreadyExists)
      throw new DuplicatedData('Email já cadastrado na plataforma')

    const user = await this.userRepository.create({
      email,
      cpf,
      name,
      password,
    })

    return { user }
  }
}
