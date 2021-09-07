import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (taskId: number) => {
        return setTasks(tasks.filter(t => t.id !== taskId))
    }
    const changeFilter = (filterValue: FilterType) => {
        setFilter(filterValue)
    }

    let taskForTodolist = tasks

    if(filter === 'active') taskForTodolist = tasks.filter(t => !t.isDone)
    if(filter === 'completed') taskForTodolist = tasks.filter(t => t.isDone)

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;


