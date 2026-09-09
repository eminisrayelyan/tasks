import { useState } from "react";
import "./TodoForm.css"

function TodoForm ({addTodo, editText}) {
    const [inputValue, setInputValue] = useState('');

    function handleSubmit (e) {
        // if (editText) {
        //     updateTodo(inputValue);
        // }
        e.preventDefault();
        addTodo(inputValue);
        setInputValue('');
    }

    return (
        <form className='todo-form' onSubmit={handleSubmit}>
            <input 
                className="input"
                value={editText || inputValue} 
                type="text" 
                onChange={(e) => setInputValue(editText || e.target.value)}
            />
            <button className="btn" type="submit">Add Task</button>
        </form>
    );
}

export default TodoForm