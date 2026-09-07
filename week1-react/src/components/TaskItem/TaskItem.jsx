import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './TaskItem.css'

function TaskItem({ text, completed, changeStatus, deleteTodo, id }) {
    function handleOnChange(id) {
        changeStatus(id);
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
            {/* <FontAwesomeIcon 
                icon={faPenToSquare} 
                className='edit'
            /> */}

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