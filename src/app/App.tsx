import React from 'react'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar'
import {useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {StatusType} from './app-reducer'
import style from './App.module.css'

export const App: React.FC<AppPropsType> = ({demo = false}) => {

    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)

    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                <ErrorSnackbar/>
            </AppBar>
            {status === 'loading' && <div className={style.linearProgress}><LinearProgress color="secondary"/></div>}
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    )
}

//Type
export type AppPropsType = {demo?: boolean}