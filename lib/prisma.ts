import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const connectionString = process.env.DATABASE_URL

const createPrismaClient = () => {
  // If we have a connection string, use the driver adapter
  if (connectionString) {
    const pool = new pg.Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  }
  
  // Fallback for the build phase:
  // We use the 'datasources' property which is the standard way to override the URL.
  // This satisfies the Prisma 7 requirement for a non-empty config during build.
  return new PrismaClient({
    datasources: {
      db: {
        url: 'postgresql://postgres:password@localhost:5432/unused'
      }
    }
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma
