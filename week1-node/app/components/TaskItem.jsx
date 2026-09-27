"use client";

import style from './TaskItem.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function TaskItem({ task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const router = useRouter();

    async function handleSave() {
        const response = await fetch(`/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });

        if (response.ok) {
            setIsEditing(false);
            router.refresh();
        }

        console.log(response.status);
    }

    async function handleDelete () {
        const response = await fetch(`/api/tasks/${task.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            router.refresh();
        }

    }

    return (
        <li className={style['list-item']}>
            {
                isEditing ? (
                    <input
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                ) : (
                    <div className={style['list-item']}>{task.title}</div>
                )
            }
            <div>{task.description}</div>

            {isEditing ? (
                <button type="button" onClick={handleSave}>
                    Save
                </button>
            ) : (
                <div>
                    <button type="button" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>

                    <button type="button" onClick={handleDelete}>
                        Delete
                    </button>
                </div>

            )}
        </li>
    )
}

export default TaskItem;