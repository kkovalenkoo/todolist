import React, {KeyboardEvent, ChangeEvent, useState} from 'react'
import {FilterType, TaskType} from './App'

type TodolistPropsType = {
    title: string
    filter: FilterType
    tasks: TaskType[]
    addTask: (newTaskTitle: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterType) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onAddTask = () => {
        if(title.trim() != '') {
            props.addTask(title)
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
        props.changeFilter('all')
    }
    const onClickActive = () => {
        props.changeFilter('active')
    }
    const onClickCompleted = () => {
        props.changeFilter('completed')
    }

    const isIllumButtonAll = props.filter === 'all' ? 'active-filter' : ''
    const isIllumButtonActive = props.filter === 'active' ? 'active-filter' : ''
    const isIllumButtonComplete = props.filter === 'completed' ? 'active-filter' : ''

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeTitle} onKeyPress={onKeyPress}/>
                <button onClick={onAddTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveTask = () => {
                            props.removeTask(t.id)
                        }
                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
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
                <button className={isIllumButtonAll} onClick={onClickAll}>All</button>
                <button className={isIllumButtonActive} onClick={onClickActive}>Active</button>
                <button className={isIllumButtonComplete} onClick={onClickCompleted}>Completed</button>
            </div>
        </div>
    )
}