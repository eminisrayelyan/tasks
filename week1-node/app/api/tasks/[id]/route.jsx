// import fs from 'fs';
// import path from 'path';
import { pool } from '../../../../lib/db';

// const filePath = path.join(process.cwd(), 'data/tasks.json');

// export async function GET(req, { params }) {
//     const { id } = await params;

//     const fileContent = await fs.promises.readFile(filePath, 'utf8');
//     const tasks = JSON.parse(fileContent);

//     const task = tasks.find(item => String(item.id) === id);

//     return Response.json(task);
// }

export async function GET(req, { params }) {
    const { id } = await params;
  
    const result = await pool.query(
      'SELECT * FROM tasks WHERE id = $1',
      [id]
    );
  
    if (result.rows.length === 0) {
      return Response.json(
        { status: 404 }
      );
    }
  
    return Response.json(result.rows[0]);
  }

// export async function PUT(req, { params }) {
//     const { id } = await params;
//     const { title, description, status } = await req.json();

//     const fileContent = await fs.promises.readFile(filePath, 'utf8');
//     const tasks = JSON.parse(fileContent);

//     const task = tasks.find(item => String(item.id) === id);

//     task.title = title.trim();
//     task.description = description.trim();
//     task.status = status.trim();

//     await fs.promises.writeFile(filePath, JSON.stringify(tasks), 'utf8');

//     return Response.json(task);
// }

export async function PUT(req, { params }) {
    const { id } = await params;
    const { title, description, status } = await req.json();


    const result = await pool.query(
        `UPDATE tasks
        SET title = $1, description = $2, status = $3
        WHERE id = $4
        RETURNING *`,
        [title.trim(), description.trim(), status.trim(), id]
    );

    return Response.json(result.rows[0]);
}

// export async function DELETE(req, { params }) {
//     const { id } = await params;

//     const fileContent = await fs.promises.readFile(filePath, 'utf8');
//     const tasks = JSON.parse(fileContent);

//     const updatedTasks = tasks.filter(task => String(task.id) !== id);

//     await fs.promises.writeFile(filePath, JSON.stringify(updatedTasks), 'utf8');

//     return Response.json(
//         { message: 'Task deleted successfully' },
//         { status: 200 }
//     );
// }

export async function DELETE(req, { params }) {
    const { id } = await params;

    try {
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1',
            [id]
        );

        return Response.json(
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            { status: 500 }
        );
    }
}