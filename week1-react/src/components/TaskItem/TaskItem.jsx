import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './TaskItem.css'

function TaskItem({ text, completed, changeStatus, editTodo, deleteTodo, id }) {
    function handleOnChange(id) {
        changeStatus(id);
    }

    function handleEdit (id) {
        editTodo(id);
    }

    function handleDelete(id) {
        deleteTodo(id);
    }

    return (
        <div className="task">
            <input
                type="checkbox"
                checked={completed}
                onChange={() => handleOnChange(id)}
            />
            <p
                className='task-name'
                style={{ textDecoration: completed ? "line-through" : "none" }}
            >
                {text}
            </p>
            <FontAwesomeIcon 
                icon={faPenToSquare} 
                className='edit'
                onClick={() => handleEdit(id)}
            />

            <FontAwesomeIcon
                className='delete'
                icon={faXmark}
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(id)}
            />
        </div>
    );
}

export default TaskItem