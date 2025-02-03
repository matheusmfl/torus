import { User } from '@prisma/client'

import { UserWithTickets } from '@/@types/Users'

import { UserRepository } from '../user-repository'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  constructor(
    initialUsers: User[] = [
      {
        id: '1',
        name: 'Admin User',
        cpf: '11111111111',
        email: 'admin@gmail.com',
        password: 'password1',
        role: 'ADMIN',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'User Two',
        cpf: '22222222222',
        email: 'user2@example.com',
        password: 'password2',
        role: 'USER',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ],
  ) {
    this.items = initialUsers
  }

  async create(): Promise<User> {
    const user: User = {
      cpf: '06965116307',
      createdAt: new Date(),
      email: 'matheusfonteles@hotmail.com',
      id: '123',
      name: 'Matheus Fonteles',
      password: '123456',
      role: 'USER',
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<UserWithTickets | null> {
    const usuario =
      this.items.find((userFinded) => userFinded.email === email) || null

    if (!usuario) return null

    return usuario
  }
}
