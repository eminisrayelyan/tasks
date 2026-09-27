import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/tasks.json');

export async function PUT(req, { params }) {
    const { id } = await params;
    const { title } = await req.json();

    if (typeof title !== 'string' || !title.trim()) {
        return Response.json(
            { error: 'Title is required' },
            { status: 400 }
        );
    }


        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        const tasks = JSON.parse(fileContent);

        const task = tasks.find(item => String(item.id) === id);

        if (!task) {
            return Response.json(
              { error: 'Task not found' },
              { status: 404 }
            );
          }
          
          task.title = title.trim();

        await fs.promises.writeFile(filePath, JSON.stringify(tasks), 'utf8');

        return Response.json(task);
    }

export async function DELETE (req, { params }) {
    const { id } = await params;
    console.log('id', id);
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const tasks = JSON.parse(fileContent);

    const updatedTasks = tasks.filter(task => String(task.id) !== id);

    await fs.promises.writeFile(filePath, JSON.stringify(updatedTasks), 'utf8');

    

    return Response.json(
        { error: 'Task not found' },
        { status: 200 }
      );
}
