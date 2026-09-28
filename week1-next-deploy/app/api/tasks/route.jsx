import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const filePath = path.join(process.cwd(), 'data/tasks.json')

export async function POST(req) {
    const { title, description, status } = await req.json();
    const newTask = {
        id: randomUUID(),
        title: title.trim(),
        description: description.trim(),
        status: status,
        createdAt: (new Date()).toString()
    }

    if (!title) {
        return new Response(null, {
            status: 404,
        });
    }

    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const tasks = JSON.parse(fileContent);

    tasks.push(newTask);

    await fs.promises.writeFile(filePath, JSON.stringify(tasks), 'utf8');
    console.log(tasks);

    return new Response(null, {
        status: 200,
    });
}

export async function GET() {
    const tasks = await fs.promises.readFile(filePath, 'utf8');

    return new Response(tasks, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}