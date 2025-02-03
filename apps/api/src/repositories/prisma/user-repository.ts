import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

import { UserRepository } from '../user-repository'

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const { cpf, email, name, password } = data
    const hashedPassword = await hash(password, 10)
    return prisma.user.create({
      data: { name, cpf, email, password: hashedPassword },
    })
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        cpf: true,
        email: true,
        name: true,
        id: true,
        tickets: {
          select: {
            id: true,
            isValidated: true,
            isRevoked: true,
            isRefunded: true,
            createdAt: true,
          },
        },
      },
    })

    return user
  }
}
