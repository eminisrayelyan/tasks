import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/tasks.json');

export async function GET(req, {params}) {
    const { id } = await params;

    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const tasks = JSON.parse(fileContent);

    const task = tasks.find(item => String(item.id) === id);

    return Response.json(task);
}

export async function PUT(req, { params }) {
    const { id } = await params;
    const { title, description, status } = await req.json();

    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const tasks = JSON.parse(fileContent);

    const task = tasks.find(item => String(item.id) === id);

    task.title = title.trim();
    task.description = description.trim();
    task.status = status.trim();

    await fs.promises.writeFile(filePath, JSON.stringify(tasks), 'utf8');

    return Response.json(task);
}

export async function DELETE(req, { params }) {
    const { id } = await params;

    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const tasks = JSON.parse(fileContent);

    const updatedTasks = tasks.filter(task => String(task.id) !== id);

    await fs.promises.writeFile(filePath, JSON.stringify(updatedTasks), 'utf8');

    return Response.json(
        { message: 'Task deleted successfully' },
        { status: 200 }
    );
}
