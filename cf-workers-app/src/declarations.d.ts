declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '@neondatabase/serverless' {
  export function neon(connectionString: string): {
    execute: (sql: string, params?: unknown[]) => Promise<{ rows: unknown[] }>;
  };
}

declare const env: Record<string, string | undefined>;