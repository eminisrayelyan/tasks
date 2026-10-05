import pg from 'pg';

const { Pool } = pg;

export const pool = globalThis.pgPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.pgPool = pool;
}