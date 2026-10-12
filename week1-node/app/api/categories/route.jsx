import { pool } from '../../../lib/db';

export async function GET() {
    const result = await pool.query('SELECT * FROM categories ORDER BY id');
    return Response.json(result.rows);
}

export async function POST(req) {
    const { name } = await req.json();

    if (!name.trim()) {
        return Response.json({ error: 'Enter a category name.' }, { status: 400 });
    }

    const result = await pool.query(
        `INSERT INTO categories (name) 
         VALUES ($1) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
         RETURNING *`,
        [name.trim()]
    );

    return Response.json(result.rows[0]);
}
