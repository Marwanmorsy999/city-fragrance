import { neon } from '@neondatabase/serverless';

let database: ReturnType<typeof neon> | null = null;

export function getDb() {
  if (!database) {
    const connectionString = env.NEON_DATABASE_URL;
    if (!connectionString) {
      throw new Error('NEON_DATABASE_URL is not configured');
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
