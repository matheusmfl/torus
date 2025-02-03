import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Criando usuários
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice Doe',
      cpf: '12345678900',
      email: 'alice@example.com',
      password: 'hashedpassword1', // Substitua por senha criptografada
      role: 'USER',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob Smith',
      cpf: '09876543211',
      email: 'bob@example.com',
      password: 'hashedpassword2', // Substitua por senha criptografada
      role: 'ADMIN',
    },
  })

  // Criando eventos
  const event1 = await prisma.event.create({
    data: {
      name: 'Concert A',
      date: new Date('2025-06-12T20:00:00Z'),
      location: 'Stadium A',
    },
  })

  const event2 = await prisma.event.create({
    data: {
      name: 'Concert B',
      date: new Date('2025-07-15T20:00:00Z'),
      location: 'Stadium B',
    },
  })

  // Criando lotes
  const batch1 = await prisma.batch.create({
    data: {
      eventId: event1.id,
      price: 100.0,
      total: 100,
      available: 100,
    },
  })

  const batch2 = await prisma.batch.create({
    data: {
      eventId: event2.id,
      price: 150.0,
      total: 100,
      available: 100,
    },
  })

  // Criando ingressos
  await prisma.ticket.create({
    data: {
      userId: user1.id,
      eventId: event1.id,
      batchId: batch1.id,
      qrCode: 'QRCode12345',
      isValidated: false,
      isRevoked: false,
      isRefunded: false,
    },
  })

  await prisma.ticket.create({
    data: {
      userId: user2.id,
      eventId: event2.id,
      batchId: batch2.id,
      qrCode: 'QRCode67890',
      isValidated: false,
      isRevoked: false,
      isRefunded: false,
    },
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
