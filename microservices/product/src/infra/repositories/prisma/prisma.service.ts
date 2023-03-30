import { PrismaClient } from '@prisma/client';

const dbUser = process.env.DATABASE_USER;
const dbPass = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_ROOT_HOST;
const dbPort = process.env.DATABASE_PORT;
const dbDatabase = process.env.DATABASE_DATABASE;

export const prismaService = new PrismaClient({
  datasources: {
    db: {
      url: `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbDatabase}`,
    },
  },
});
