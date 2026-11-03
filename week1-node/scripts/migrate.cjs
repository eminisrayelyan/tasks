const { Pool } = require('pg');
const up = require('../migrations/up.cjs');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  try {
    await up(pool);
    console.log('Categories migration complete.');
  } finally {
    await pool.end();
  }
}

migrate();
