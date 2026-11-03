"use client";

import style from './TaskItem.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function TaskItem({ task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const router = useRouter();

    async function handleSave() {
        const response = await fetch(`/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, status }),
        });

        if (response.ok) {
            setIsEditing(false);
            router.refresh();
        }

        console.log(response.status);
    }

    async function handleDelete() {
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
                    <div>
                        <input
                            className={style.input}
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                        />
                        <input
                            className={style.input}
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />
                        <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                ) : (
                    <div className={style['task-info']}>
                        <h2 className={style.title}>{task.title}</h2>
                        <p className={style.description}>{task.description}</p>
                        <div className={style.status}>{task.status}</div>
                    </div>

                )
            }


            {isEditing ? (
                <button className={style.button} type="button" onClick={handleSave}>
                    Save
                </button>
            ) : (
                <div className={style['buttons-wrapper']}>
                        <button className={style.button} type="button" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>

                        <button className={`${style.button} ${style.delete}`} type="button" onClick={handleDelete}>
                            Delete
                        </button>
                </div>
            )
            }

        </li>
    )
}

export default TaskItem;