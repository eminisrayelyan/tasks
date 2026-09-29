import style from './page.module.css'
import TaskItem from './components/TaskItem';

async function Home() {
  const response = await fetch('http://localhost:3000/api/tasks');
  const tasks = await response.json();

  return (
    <div className={style['task-wrapper']}>
      <h1>Tasks</h1>
      <ul className={style.list}>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task}></TaskItem>
          )
         )
        }
      </ul>
    </div>
  )
}

export default Home;