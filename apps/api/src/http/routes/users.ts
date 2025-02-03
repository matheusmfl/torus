import { FastifyInstance } from 'fastify'

import { createUserController } from '../controllers/users/create'

export async function usersRoutes(app: FastifyInstance) {
  app.register(createUserController)
}
