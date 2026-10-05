import fs from 'fs';
import path from 'path';
import { pool } from '../../../lib/db';
// import { randomUUID } from 'crypto';

// const filePath = path.join(process.cwd(), 'data/tasks.json')

export async function POST(req) {
  const {
    title,
    description = "",
    status = "pending",
  } = await req.json();

  if (!title) {
    return new Response(null, {
      status: 404,
    });
  }

  const result = await pool.query(
    `INSERT INTO tasks (title, description, status, user_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title.trim(), description.trim(), status, 5]
  );

  return Response.json(result.rows[0], { status: 201 });
}

// export async function POST(req) {
//     const { title, description, status } = await req.json();
//     const newTask = {
//         id: randomUUID(),
//         title: title.trim(),
//         description: description.trim(),
//         status: status,
//         createdAt: (new Date()).toString()
//     }

//     if (!title) {
//         return new Response(null, {
//             status: 404,
//         });
//     }


//     const fileContent = await fs.promises.readFile(filePath, 'utf8');
//     const tasks = JSON.parse(fileContent);

//     tasks.push(newTask);

//     await fs.promises.writeFile(filePath, JSON.stringify(tasks), 'utf8');
//     console.log(tasks);

//     return new Response(null, {
//         status: 200,
//     });
// }



export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks ORDER BY id'
    );

    return Response.json(result.rows);
  } catch (error) {

    return Response.json(
      { status: 500 }
    );
  }
}

// export async function GET(req) {
//     const status = req.nextUrl.searchParams.get('status');
//     const tasks = await fs.promises.readFile(filePath, 'utf8');

//     if(!status) {
//         return new Response(tasks, {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' }
//         })
//     }

//     const filteredTasks = JSON.parse(tasks).filter(tasks => tasks.status === status);

//     return Response.json(filteredTasks, {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' }
//     })
// }