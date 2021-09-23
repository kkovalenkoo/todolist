import React, {useState} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const addTask = (newTaskTitle: string) => {
        const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const removeTask = (taskId: string) => {
        return setTasks(tasks.filter(t => t.id !== taskId))
    }
    const changeFilter = (filterValue: FilterType) => {
        setFilter(filterValue)
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        const task = tasks.find(t => t.id === id)
        if(task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    let taskForTodolist = tasks

    if (filter === 'active') taskForTodolist = tasks.filter(t => !t.isDone)
    if (filter === 'completed') taskForTodolist = tasks.filter(t => t.isDone)

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={taskForTodolist}
                      filter={filter}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    )
}

export default App


