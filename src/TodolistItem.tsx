import {type ChangeEvent} from 'react'
import type {FilterValues, Task } from './App'
import {Button} from './Button'
import {CreateItemForm} from './CreateItemForm'
import {EditableSpan} from "./EditableSpan.tsx";


type Props = {
  title: string
  todolistId: string
  tasks: Task[]
  filter: FilterValues

  deleteTask: (taskId: string, todolistId: string) => void
  createTask: (title: string, todolistId: string) => void
  changeTodolistFilter: (filter: FilterValues, todolistId: string) => void

  deleteTodolist : (todolistId: string) => void
  changeTodolistTitle : (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle : (taskId: string, title: string, todolistId: string) => void
}

export const TodolistItem = (props: Props) => {
  const {
    todolistId,
    title,
    tasks,
    filter,

    deleteTask,
    createTask,
    changeTaskStatus,
    changeTaskTitle,

    deleteTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
  } = props

  // const [taskTitle, setTaskTitle] = useState('')
  // const [error, setError] = useState<string | null>(null)

  const createTaskHandler = (title: string) => {
    // const trimmedTitle = taskTitle.trim()
    // if (trimmedTitle !== '') {
      createTask(title, todolistId)
    //   setTaskTitle('')
    // } else {
    //   setError('Title is required')
    // }
  }

  // const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setTaskTitle(event.currentTarget.value)
  //   setError(null)
  // }
  //
  // const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     createTaskHandler()
  //   }
  // }

  const deleteTodolistHandler = () => {
    deleteTodolist(todolistId)
  }

  const changeTodolistTitleHandler = (newTitle: string) => {
    changeTodolistTitle(todolistId, newTitle)
  }

  return (
      <div>
        <h3>
          {/*{title}*/}
          <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
          <Button title="x" onClick={deleteTodolistHandler}></Button>
        </h3>
        <CreateItemForm createItem={createTaskHandler}/>
        {/*<div>*/}
        {/*  <input className={error ? 'error' : ''}*/}
        {/*         value={taskTitle}*/}
        {/*         onChange={changeTaskTitleHandler}*/}
        {/*         onKeyDown={createTaskOnEnterHandler}/>*/}
        {/*  <Button title={'+'} onClick={createTaskHandler}/>*/}
        {/*  {error && <div className={'error-message'}>{error}</div>}*/}
        {/*</div>*/}
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <ul>
              {tasks.map(task => {
                const deleteTaskHandler = () => {
                  deleteTask(task.id, todolistId)
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  const newStatusValue = e.currentTarget.checked
                  changeTaskStatus(task.id, newStatusValue, todolistId)
                }

                const changeTaskTitleHandler = (newTitle: string) => {
                  changeTaskTitle(task.id, newTitle, todolistId)
                }

                return (
                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                      <input type="checkbox" checked={task.isDone}
                             onChange={changeTaskStatusHandler}/>
                      {/*<span>{task.title}</span>*/}
                      <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                      <Button title={'x'} onClick={deleteTaskHandler}/>
                    </li>
                )
              })}
            </ul>
        )}
        <div>
          <Button className={filter === 'all' ? 'active-filter' : ''}
                  title={'All'}
                  onClick={() => changeTodolistFilter('all', todolistId)}/>
          <Button className={filter === 'active' ? 'active-filter' : ''}
                  title={'Active'}
                  onClick={() => changeTodolistFilter('active', todolistId)}/>
          <Button className={filter === 'completed' ? 'active-filter' : ''}
                  title={'Completed'}
                  onClick={() => changeTodolistFilter('completed', todolistId)}/>
        </div>
      </div>
  )
}
