import "./App.css";
import TodoForm from "./components/TodoForm/TodoForm";
import TaskItem from "./components/TaskItem/TaskItem";
import { useState, useRef } from "react";

function App() {
  const ID = useRef(0);
  const [tasks, setTasks] = useState([]);
  const [editText, setEditText] = useState('');
 
  function addTodo(inputValue) {
    if (inputValue === '') {
      alert("Please Write a Task Name");
      return;
    }
    
    const newTodo = {
      id: ++ID.current,
      text: inputValue,
      completed: false,
    };

    setTasks((prev) => [...prev, newTodo]);
  }

  function editTodo (id) {
    tasks.forEach(task => {
      if(task.id === id) {
        setEditText(task.text);
      }
    })
  }

  function deleteTodo(id) {
    setTasks(tasks => {
      return tasks.filter(task => task.id !== id);
    })
  }

  function changeStatus(id) {
    setTasks(tasks =>
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        } else {
          return task;
        }
      }),
    );
  }

  return (
    <div className="todo-container">
      <h1>To Do</h1>
      <TodoForm addTodo={addTodo} editText={editText || ''}></TodoForm>
      <div className="task-list">
        {tasks.map((item) => {
          return (
            <TaskItem
              text={item.text}
              completed={item.completed}
              changeStatus={changeStatus}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              id={item.id}
              key={item.id}
            ></TaskItem>
          );
        })}
      </div>
    </div>
  );
}

export default App;