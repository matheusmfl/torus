import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PrismaUserRepository } from '@/repositories/prisma/user-repository'
import { FindUserByEmailUseCase } from '@/use-cases/users/FindByEmail'

export async function findByEmailController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users/findByEmail',
    {
      schema: {
        tags: ['Users'],
        summary: 'Encontrar usuário por e-mail',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
            cpf: z.string(),
            tickets: z
              .object({
                id: z.string(),
                isValidated: z.boolean(),
                isRevoked: z.boolean(),
                isRefunded: z.boolean(),
                createdAt: z.date(),
              })
              .optional()
              .nullable(),
          }),
          400: z.object({
            message: z.string(),
            errors: z
              .object({
                email: z.array(z.string()),
                name: z.array(z.string()),
              })
              .optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const userRepository = new PrismaUserRepository()

      const findUserByEmail = new FindUserByEmailUseCase(userRepository)
      const { user } = await findUserByEmail.execute(email)
      return reply.status(201).send({
        cpf: user.cpf,
        email: user.email,
        id: user.id,
        name: user.name,
      })
    },
  )
}
