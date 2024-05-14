import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import path from 'node:path';
import schemaExport from './schemaExport';
dotenv.config({ path: '../.env.production.local' });

if (!process.env.TURSO_URL) throw new Error('Cannot retrieve database url! Check env variables!');
if (!process.env.TURSO_TOKEN) throw new Error('Cannot retrieve database token! Check env variables!');

const turso = createClient({ url: process.env.TURSO_URL, authToken: process.env.TURSO_TOKEN });
const drizzleClient = drizzle(turso, { schema: schemaExport });

void (async () => {
  await migrate(drizzleClient, {
    migrationsFolder: path.resolve(process.cwd(), './drizzle_dev'),
  });
  console.log('Successfully migrated dev db.');
})();
