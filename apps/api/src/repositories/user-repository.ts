import { Prisma, User } from '@prisma/client'

import { findUserByEmailResponse } from '@/@types/Users'

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<findUserByEmailResponse | null>
}
