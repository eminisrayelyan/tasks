import "./TodoForm.css"

function TodoForm({ inputValue, setInputValue, addTodo }) {
    function handleSubmit(e) {
        e.preventDefault();
        addTodo();
    }

    return (
        <form className='todo-form' onSubmit={handleSubmit}>
            <input
                className="input"
                value={inputValue}
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="btn" type="submit">Add Task</button>
        </form>
    );
}

export default TodoForm