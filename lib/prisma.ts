import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const connectionString = process.env.DATABASE_URL

const createPrismaClient = () => {
  // If we have a connection string, use the driver adapter (required for Prisma 7 + PostgreSQL on some environments)
  if (connectionString) {
    const pool = new pg.Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  }
  
  // Fallback for the build phase:
  // Prisma 7 requires a non-empty configuration if the schema doesn't have a URL.
  // We provide a dummy URL to satisfy the constructor during 'next build'.
  return new PrismaClient({
    datasourceUrl: 'postgresql://postgres:password@localhost:5432/unused'
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma
