"use client";
import styles from './create.module.css'
import { useRouter } from "next/navigation";
import { useState } from "react";

function create() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, status })
            });

            if (response.ok) {
                setTitle('');
                setDescription('');
                router.push('/');
                router.refresh();
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch {
            setError('Wrong Operation')
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <label htmlFor="title">Task:</label>
            <input className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} name='title' />

            <label htmlFor="description">Description:</label>
            <input className={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} name='description' />

            <label htmlFor="status">Status: </label>
            <select className={styles.select} name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>

            <button className={styles.button} type="submit">Create</button>
        </form>
    )
}

export default create;