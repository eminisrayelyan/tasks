import style from './page.module.css'
import fs from 'fs'
import path from 'path'
import TaskItem from './components/TaskItem';

async function Home() {
  const filePath = path.join(process.cwd(), 'data', 'tasks.json');
  const content = await fs.promises.readFile(filePath, 'utf8');
  const tasks = JSON.parse(content);


  return (
    <div className={style['task-wrapper']}>
      <h1>Tasks</h1>
      <ul className={style.list}>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task}></TaskItem>
        )

        )}
      </ul>
    </div>
  )

}


export default Home;