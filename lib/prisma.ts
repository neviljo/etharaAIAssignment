import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const connectionString = process.env.DATABASE_URL

const createPrismaClient = () => {
  // If we don't have a connection string, return a basic client.
  // This prevents the build from crashing if the DB is not yet connected.
  if (!connectionString) {
    return new PrismaClient()
  }
  
  const pool = new pg.Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma
