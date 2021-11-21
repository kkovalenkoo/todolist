import {todolistAPI, TodolistType} from '../../api/api'
import {Dispatch} from 'redux'
import {setAppStatusAC, StatusType} from '../../app/app-reducer'
import {handleNetworkError} from '../../utils/error-utils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: TodolistDomainType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', status: 'idle'})
        },
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state.splice(index, 1)
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistStatusAC(state, action: PayloadAction<{ id: string, status: StatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].status = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', status: 'idle'}))
        },
    }
})

export const todolistsReducer = slice.reducer
export const {
    addTodolistAC,
    setTodolistsAC,
    removeTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    changeTodolistStatusAC
} = slice.actions

//Thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    return todolistAPI.getTodolists()
        .then(res => {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(setTodolistsAC({todolists: res.data}))
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
        })
}
export const deleteTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistStatusAC({id, status: 'loading'}))
    todolistAPI.deleteTodolist(id)
        .then(() => {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(removeTodolistAC({id}))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(addTodolistAC({todolist: res.data.data.item}))
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title)
        .then(() => dispatch(changeTodolistTitleAC({id, title})))
}

//Types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & { filter: FilterValuesType, status: StatusType }