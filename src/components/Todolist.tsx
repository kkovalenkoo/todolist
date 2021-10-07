import React, {ChangeEvent} from 'react'
import {FilterType, TaskType} from '../App'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Button, Checkbox, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'

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
    const removeTodolist = () => props.removeTodolist(props.todolistId)

    const onClickAll = () => {
        props.changeFilter('all', props.todolistId)
    }
    const onClickActive = () => {
        props.changeFilter('active', props.todolistId)
    }
    const onClickCompleted = () => {
        props.changeFilter('completed', props.todolistId)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
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
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox color={'primary'} checked={t.isDone} onChange={onChangeStatus}/>
                                <EditableSpan title={t.title} onChange={changeTaskTitle}/>
                                <IconButton onClick={onRemoveTask}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        color={'default'}
                        onClick={onClickAll}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={onClickActive}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={onClickCompleted}>Completed
                </Button>
            </div>
        </div>
    )
}

