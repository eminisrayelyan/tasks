import style from './page.module.css'
import TaskItem from './components/TaskItem';
import { pool } from "../lib/db";
export const dynamic = "force-dynamic";

async function Home() {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id");
  const tasks = result.rows;

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