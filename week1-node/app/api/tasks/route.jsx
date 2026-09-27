import fs from 'fs';
import path  from 'path';
import { randomUUID } from 'crypto';

const tasks = [];
const filePath = path.join(process.cwd(), 'data/tasks.json')

export async function POST(req) {
    const { title, description } = await req.json();
    const newTask  = {
        id: randomUUID(),
        title: title,
        description: description,
        isCompleted: false,
        date: (new Date()).toString()
    }

    tasks.push(newTask);

    await fs.promises.writeFile(filePath, JSON.stringify(tasks), 'utf8');
    console.log(tasks);

    return new Response(JSON.stringify(newTask), {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    });
}   

export async function GET() {
    const tasks  = await fs.promises.readFile(filePath, 'utf8');

    return new Response(tasks,  {
        status: 200,
        headers: { 'Content-Type' : 'application/json' }
    })
}