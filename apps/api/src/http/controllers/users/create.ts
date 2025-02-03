import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { InvalidCpfError } from '@/http/_errors/invalid-cpf'
import { PrismaUserRepository } from '@/repositories/prisma/user-repository'
import { CreateUserUseCase } from '@/use-cases/users/CreateUserUseCase'

export async function createUserController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/auth/register',
    {
      schema: {
        tags: ['Users'],
        summary: 'Register a new user',
        body: z.object({
          name: z.string().min(3),
          cpf: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
            cpf: z.string(),
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
      const { name, cpf, email, password } = request.body

      if (!cpfValidator.isValid(cpf)) {
        throw new InvalidCpfError('Você deve digitar um CPF válido!')
      }
      const userRepository = new PrismaUserRepository()

      const createUserUseCase = new CreateUserUseCase(userRepository)
      const { user } = await createUserUseCase.execute({
        name,
        cpf,
        email,
        password,
      })
      return reply.status(201).send({
        cpf: user.cpf,
        email: user.email,
        id: user.id,
        name: user.name,
      })
    },
  )
}
