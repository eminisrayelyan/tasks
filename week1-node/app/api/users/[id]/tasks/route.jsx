import { pool } from '../../../../../lib/db';

export async function GET(req, { params }) {
  const { id } = await params;

  const result = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1 ORDER BY id',
    [id]
  );

  return Response.json(result.rows);
}