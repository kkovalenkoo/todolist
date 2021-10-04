import React, {ChangeEvent} from 'react'
import {FilterType, TaskType} from './App'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'

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
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
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
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={() => props.removeTodolist(props.todolistId)}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveTask = () => {
                            props.removeTask(t.id, props.todolistId)
                        }
                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
                        }
                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(props.todolistId, t.id, title)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeStatus}/>
                                <EditableSpan title={t.title} onChange={changeTaskTitle}/>
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

