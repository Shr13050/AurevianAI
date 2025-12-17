// Import the auto-generated Prisma client from your custom output directory
import { PrismaClient } from '../generated/prisma/client'

// (Optional) Import for PostgreSQL adapter - currently commented out
// import { PrismaPg } from '@prisma/adapter-pg'

// Create a type-safe reference to the global object to store Prisma client
// This prevents TypeScript errors when adding custom properties to global
const globalForPrisma = global as unknown as {
    prisma: PrismaClient // Type definition for the prisma property
}

// (Optional) PostgreSQL adapter configuration - currently commented out
// const adapter = new PrismaPg({
//     connectionString: process.env.DATABASE_URL, // Database connection string from environment variables
// })

// Create singleton Prisma client instance
// If global.prisma exists (in development), reuse it; otherwise create a new PrismaClient
// This prevents creating multiple connections during hot reloads in development
const prisma = globalForPrisma.prisma || new PrismaClient()

// In development mode, store the Prisma client on global object to survive hot reloads
// This ensures we don't create a new database connection on every file change
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Export the Prisma client instance for use throughout the application
export default prisma