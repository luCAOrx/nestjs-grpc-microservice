import type {
  JestEnvironmentConfig,
  EnvironmentContext,
} from '@jest/environment';
import { exec } from 'node:child_process';
import * as dotenv from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { createConnection } from 'mariadb';
import { randomBytes } from 'node:crypto';
import { promisify } from 'node:util';

dotenv.config({ path: '.env.test' });

const execSync = promisify(exec);

export default class PrismaTestEnvironment extends NodeEnvironment {
  private database: string;
  private connectionString: string;

  constructor(config: JestEnvironmentConfig, _context: EnvironmentContext) {
    super(config, _context);

    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASSWORD;
    const dbHost = process.env.DATABASE_ROOT_HOST;
    const dbPort = process.env.DATABASE_PORT;

    this.database = `test_${randomBytes(10).toString('hex')}`;
    this.connectionString = `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${this.database}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync('yarn prisma db push');

    return super.setup();
  }

  async teardown() {
    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASSWORD;
    const dbHost = process.env.DATABASE_ROOT_HOST;
    const dbPort = process.env.DATABASE_PORT;

    const connection = await createConnection({
      user: dbUser,
      password: dbPass,
      host: dbHost,
      port: Number(dbPort),
    });

    await connection.query(`DROP DATABASE IF EXISTS ${this.database};`);

    connection.destroy();
  }
}
