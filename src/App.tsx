import React, {useState} from 'react'
import './App.css'
import {Todolist} from './components/Todolist'
import {v1} from 'uuid'
import {AddItemForm} from './components/AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'


export type TodolistType = {
    id: string,
    title: string,
    filter: FilterType
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TaskStateType = {
    [key: string]: TaskType[]
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Pen', isDone: false}
        ]
    })

    const addTask = (newTaskTitle: string, todolistId: string) => {
        const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }
    const removeTask = (taskId: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }
    const changeFilter = (filterValue: FilterType, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filterValue
            setTodolists([...todolists])
        }
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const todolistTasks = tasks[todolistId]
        const task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        const todolistTasks = tasks[todolistId]
        const task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = title
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {

                        let allTodolistTasks = tasks[tl.id]
                        let todolistTasks = allTodolistTasks

                        if (tl.filter === 'active') todolistTasks = allTodolistTasks.filter(t => !t.isDone)
                        if (tl.filter === 'completed') todolistTasks = allTodolistTasks.filter(t => t.isDone)

                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist key={tl.id}
                                             todolistId={tl.id}
                                             title={tl.title}
                                             filter={tl.filter}
                                             tasks={todolistTasks}
                                             addTask={addTask}
                                             removeTask={removeTask}
                                             changeFilter={changeFilter}
                                             changeTaskStatus={changeTaskStatus}
                                             removeTodolist={removeTodolist}
                                             changeTaskTitle={changeTaskTitle}
                                             changeTodolistTitle={changeTodolistTitle}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App


