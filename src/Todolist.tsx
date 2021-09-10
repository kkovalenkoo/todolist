import React, {KeyboardEvent, ChangeEvent, useState} from 'react'
import {FilterType, TaskType} from './App'

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    addTask: (newTaskTitle: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterType) => void
}

export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>('')

    const onAddTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddTask()
        }
    }
    const onClickAll = () => {
        props.changeFilter('all')
    }
    const onClickActive = () => {
        props.changeFilter('active')
    }
    const onClickCompleted = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeTitle} onKeyPress={onKeyPress}/>
                <button onClick={onAddTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveTask = () => {
                            props.removeTask(t.id)
                        }

                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveTask}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onClickAll}>All</button>
                <button onClick={onClickActive}>Active</button>
                <button onClick={onClickCompleted}>Completed</button>
            </div>
        </div>
    )
}