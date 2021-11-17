import React, {ChangeEvent, useState} from 'react'
import {taskAPI} from '../api/api'

export default {
    title: 'API/Tasks'
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    const createTaskHandler = () => {
        taskAPI.createTask(todolistId, taskTitle)
            .then(res => setState(res.data))
    }
    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder="todolistId" value={todolistId} onChange={onChangeTodolistIdHandler}/>
                <input placeholder="Task title" value={taskTitle} onChange={onChangeTitleHandler}/>
                <button onClick={createTaskHandler}>
                    Create Task
                </button>
            </div>
        </div>
    )
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasksHandler = () => {
        taskAPI.getTasks(todolistId)
            .then(res => setState(res.data))
    }
    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder="todolistId" value={todolistId} onChange={onChangeTodolistIdHandler}/>
                <button onClick={getTasksHandler}>
                    Get Tasks
                </button>
            </div>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState('')

    const updateTaskHandler = () => {
        taskAPI.updateTask(todolistId, taskId, {
            title: taskTitle,
            deadline: '',
            description: '',
            priority: 1,
            startDate: '',
            status: 2
        })
            .then(res => setState(res.data))
    }
    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
    const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder="todolistId" value={todolistId} onChange={onChangeTodolistIdHandler}/>
                <input placeholder="taskId" value={taskId} onChange={onChangeTaskIdHandler}/>
                <input placeholder="Task title" value={taskTitle} onChange={onChangeTitleHandler}/>
                <button onClick={updateTaskHandler}>
                    Update Task
                </button>
            </div>
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTaskHandler = () => {
        taskAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }
    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder="todolistId" value={todolistId} onChange={onChangeTodolistIdHandler}/>
                <input placeholder="taskId" value={taskId} onChange={onChangeTitleHandler}/>
                <button onClick={deleteTaskHandler}>
                    Delete Task
                </button>
            </div>
        </div>
    )
}