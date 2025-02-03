import { User } from '@prisma/client'

export interface UserWithTickets extends User {
  tickets?: {
    id: string
    isValidated: boolean
    isRevoked: boolean
    isRefunded: boolean
    createdAt: Date
  }
}

export type findUserByEmailResponse = Omit<
  UserWithTickets,
  'password' | 'role' | 'createdAt' | 'updatedAt'
>
