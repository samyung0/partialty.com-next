/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
dotenv.config({ path: '.env.development.local' });

if (!process.env.TURSO_URL) throw new Error('Cannot retrieve database url! Check env variables!');
if (!process.env.TURSO_TOKEN) throw new Error('Cannot retrieve database token! Check env variables!');

export default {
  schema: './db/schema/*',
  out: './db/drizzle_dev',
  driver: 'turso',
  dbCredentials: {
    // url: "file:./drizzle_turso/local.db"
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_TOKEN,
  },
  verbose: true,
  strict: true,
} satisfies Config;
