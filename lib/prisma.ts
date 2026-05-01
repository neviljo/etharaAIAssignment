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
    // We add ssl configuration which is often required for cloud databases like Railway's Postgres
    const pool = new pg.Pool({ 
      connectionString,
      ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
    })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  }
  
  // Fallback for the build phase
  return new PrismaClient({
    accelerateUrl: 'prisma://dummy-url-for-build-phase'
  } as any)
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma
