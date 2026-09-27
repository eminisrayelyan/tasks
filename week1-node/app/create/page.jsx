"use client";
import styles from './create.module.css'
import { useRouter } from "next/navigation";
import { useState } from "react";

function create() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        })

        if (response.ok) {
            setTitle('');
            router.push('/');
            router.refresh();
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="title">Task:</label>
            <input className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} name='title' />

            <label htmlFor="description">Description:</label>
            <input className={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} name='description' />

            <button className={styles.button} type="submit">Create</button>
        </form>
    )
}

export default create;