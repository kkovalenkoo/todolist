import React, {useCallback, useEffect} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, StatusType} from './app-reducer'
import style from './App.module.css'
import {Login} from '../features/Login/Login'
import {logoutTC} from '../features/Login/auth-reducer'

export const App: React.FC<AppPropsType> = ({demo = false}) => {

    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    if (!isInitialized) return <LinearProgress color="secondary"/>

    return (
        <BrowserRouter>
            <AppBar position="relative">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <div className={style.header}>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </div>
                </Toolbar>
                <ErrorSnackbar/>
            </AppBar>
            {status === 'loading' &&
            <div className={style.linearProgress}>
                <LinearProgress color="secondary"/>
            </div>}
            <Container fixed>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/todolist" element={<TodolistsList demo={demo}/>}/>
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

//Type
export type AppPropsType = { demo?: boolean }