import { neon } from '@neondatabase/serverless';
import { hyperdrive } from 'cloudflare:hyperdrive';

let database: ReturnType<typeof neon> | null = null;

export function getDb() {
  if (!database) {
    const connectionString = hyperdrive.connectionString;
    if (!connectionString) {
      throw new Error('Hyperdrive binding DATABASE is not configured');
    }
    database = neon(connectionString);
  }
  return database;
}

export async function query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
  const db = getDb();
  const result = await db.execute(sql, params);
  return result.rows as T[];
}

export async function execute(sql: string, params: unknown[] = []): Promise<void> {
  const db = getDb();
  await db.execute(sql, params);
}
