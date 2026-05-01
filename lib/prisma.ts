import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const connectionString = process.env.DATABASE_URL

const createPrismaClient = () => {
  // 1. If we have a real connection string, use the driver adapter (Production/Local Runtime)
  if (connectionString) {
    const pool = new pg.Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  }
  
  // 2. Fallback for the build phase (Next.js 'next build'):
  // Prisma 7 MANDATES either 'adapter' or 'accelerateUrl'.
  // We provide a dummy accelerateUrl to satisfy the constructor and prevent crashes.
  return new PrismaClient({
    accelerateUrl: 'prisma://dummy-url-for-build-phase'
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma
