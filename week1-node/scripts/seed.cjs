const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
  try {
    await pool.query(
      `INSERT INTO categories (name) 
       VALUES ($1) ON CONFLICT (name) DO NOTHING`,
      ['Books']
    );
    console.log('Seed complete: Books is in the categories table.');
  } finally {
    await pool.end();
  }
}

seed();
