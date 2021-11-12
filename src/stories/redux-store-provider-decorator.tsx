import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {AppRootStateType} from '../app/store'
import {TaskPriorities, TaskStatuses} from '../api/todolists-api'
import {appReducer} from '../app/app-reducer'
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', status: 'idle', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', status: 'loading', addedDate: '', order: 0}
    ],
    tasks: {
        'todolistId1': [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                order: 0, priority: TaskPriorities.Low, addedDate: '',
                startDate: '', deadline: '', description: ''
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                order: 0, priority: TaskPriorities.Low, addedDate: '',
                startDate: '', deadline: '', description: ''
            }
        ],
        'todolistId2': [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                order: 0, priority: TaskPriorities.Low, addedDate: '',
                startDate: '', deadline: '', description: ''
            },
            {
                id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                order: 0, priority: TaskPriorities.Low, addedDate: '',
                startDate: '', deadline: '', description: ''
            }
        ]
    },
    app: {
        status: 'idle',
        error: null,
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunkMiddleware))

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
