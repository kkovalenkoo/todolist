import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    TodolistDomainType
} from './todolists-reducer'
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from './tasks-reducer'
import {TaskStatuses} from '../../api/api'
import {Grid, Paper} from '@material-ui/core'
import {AddItemForm} from '../../components/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Navigate} from 'react-router-dom'

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false}) => {

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) return
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC(todolistId, title)
        dispatch(thunk)
    }, [dispatch])
    const removeTask = useCallback(function (todolistId: string, taskId: string) {
        const thunk = removeTaskTC(todolistId, taskId)
        dispatch(thunk)
    }, [dispatch])
    const changeStatus = useCallback(function (todolistId: string, taskId: string, status: TaskStatuses) {
        const thunk = updateTaskTC(todolistId, taskId, {status})
        dispatch(thunk)
    }, [dispatch])
    const changeTaskTitle = useCallback(function (todolistId: string, taskId: string, title: string) {
        const thunk = updateTaskTC(todolistId, taskId, {title})
        dispatch(thunk)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])
    const removeTodolist = useCallback(function (id: string) {
        const thunk = deleteTodolistTC(id)
        dispatch(thunk)
    }, [dispatch])
    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodolistTitleTC(id, title)
        dispatch(thunk)
    }, [dispatch])
    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC({id: todolistId, filter: value})
        dispatch(action)
    }, [dispatch])

    if (!isLoggedIn) return <Navigate replace to={'/login'}/>

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    todolist={tl}
                                    demo={demo}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}

//Type
type TodolistsListPropsType = { demo?: boolean }