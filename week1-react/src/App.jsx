import "./App.css";
import TodoForm from "./components/TodoForm/TodoForm";
import TaskItem from "./components/TaskItem/TaskItem";
import { useState, useRef } from "react";

function App() {
  const ID = useRef(0);
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);

  function addTodo() {
    const text = inputValue.trim();

    if (inputValue === '') {
      alert("Please Write a Task Name");
      return;
    }

    if (editingId) {
      setTasks(prev => {
        return prev.map(task => {
          return task.id === editingId ? { ...task, text } : task;
        })
      });
    } else {
      const newTodo = {
        id: ++ID.current,
        text: inputValue,
        completed: false,
      };

      setTasks((prev) => [...prev, newTodo]);
    }

    setInputValue('');
    setEditingId(null);
  }

  function editTodo(id) {
    const task = tasks.find(task => task.id === id);

    setEditingId(id);
    setInputValue(task.text);
  }

  function deleteTodo(id) {
    setTasks(tasks => {
      return tasks.filter(task => task.id !== id);
    });
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
      <TodoForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        addTodo={addTodo}
        isEditing={editingId}
      />
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;