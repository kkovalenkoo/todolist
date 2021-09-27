import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterType, TaskType} from './App'

type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterType
    tasks: TaskType[]
    addTask: (newTaskTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filterValue: FilterType, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onAddTask = () => {
        if (title.trim() != '') {
            props.addTask(title, props.todolistId)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            onAddTask()
        }
    }
    const onClickAll = () => {
        props.changeFilter('all', props.todolistId)
    }
    const onClickActive = () => {
        props.changeFilter('active', props.todolistId)
    }
    const onClickCompleted = () => {
        props.changeFilter('completed', props.todolistId)
    }

    const isShowButtonAll = props.filter === 'all' ? 'active-filter' : ''
    const isShowButtonActive = props.filter === 'active' ? 'active-filter' : ''
    const isShowButtonComplete = props.filter === 'completed' ? 'active-filter' : ''

    return (
        <div>
            <h3>{props.title}
                <button onClick={() => props.removeTodolist(props.todolistId)}>x</button>
            </h3>
            <div>
                <input value={title} onChange={onChangeTitle} onKeyPress={onKeyPress}/>
                <button onClick={onAddTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveTask = () => {
                            props.removeTask(t.id, props.todolistId)
                        }
                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeStatus}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveTask}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={isShowButtonAll} onClick={onClickAll}>All</button>
                <button className={isShowButtonActive} onClick={onClickActive}>Active</button>
                <button className={isShowButtonComplete} onClick={onClickCompleted}>Completed</button>
            </div>
        </div>
    )
}