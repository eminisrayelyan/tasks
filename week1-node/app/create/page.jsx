"use client";
import styles from './create.module.css'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function create() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [categoryChoice, setCategoryChoice] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        async function loadCategories() {
            try {
                const response = await fetch('/api/categories');
                if (!response.ok) {
                    throw new Error();
                }
                const data = await response.json();
                setCategories(data);
            } catch {
                setError('Could not load categories.');
            }
        }
        loadCategories();
    }, []);

    async function addCategory() {
        if (!newCategory.trim()) {
            return;
        }
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newCategory.trim() })
        });

        if (!response.ok) {
            throw new Error();
        }

        const category = await response.json();

        if (!categories.some(item => item.id === category.id)) {
            setCategories([...categories, category]);
        }
        if (!categoryIds.includes(category.id)) {
            setCategoryIds([...categoryIds, category.id]);
        }
        setNewCategory('');
        setCategoryChoice('');
    }

    function selectCategory(e) {
        const value = e.target.value;
        setCategoryChoice(value);

        if (value && value !== 'new') {
            setCategoryIds([...categoryIds, Number(value)]);
            setCategoryChoice('');
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, status, categoryIds })
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

            <label htmlFor="category">Categories:</label>
            <select className={styles.select} id="category" value={categoryChoice}
                onChange={selectCategory}>
                <option value="">Select category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id} disabled={categoryIds.includes(category.id)}>
                        {category.name}
                    </option>
                ))}
                <option value="new">Add new category</option>
            </select>

            {categoryIds.length > 0 && (
                <div className={styles.categories}>
                    {categories.filter(category => categoryIds.includes(category.id)).map(category => (
                        <div key={category.id}>
                            {category.name}{' '}
                            <button type="button" aria-label={`Remove ${category.name}`}
                                onClick={() => setCategoryIds(categoryIds.filter(id => id !== category.id))}>
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {categoryChoice === 'new' && (
                <>
                    <label htmlFor="newCategory">New category:</label>
                    <input className={styles.input} id="newCategory" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                    <button className={styles.button} type="button" onClick={addCategory}>Add category</button>
                </>
            )}

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