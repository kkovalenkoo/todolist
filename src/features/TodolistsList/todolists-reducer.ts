import {todolistAPI, TodolistType} from '../../api/api'
import {Dispatch} from 'redux'
import {setAppStatusAC, StatusType} from '../../app/app-reducer'
import {handleNetworkError} from '../../utils/error-utils'

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', status: 'idle'}, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, status: action.status} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', status: 'idle'}))
        default:
            return state
    }
}

//Actions
export const addTodolistAC = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST', todolist
} as const)
export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST', id
} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER', id, filter
} as const)
export const changeTodolistStatusAC = (id: string, status: StatusType) => ({
    type: 'CHANGE-TODOLIST-STATUS', id, status
} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: 'SET-TODOLISTS', todolists
} as const)

//Thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    return todolistAPI.getTodolists()
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTodolistsAC(res.data))
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
        })
}
export const deleteTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistStatusAC(id, 'loading'))
    todolistAPI.deleteTodolist(id)
        .then(() => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(removeTodolistAC(id))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title)
        .then(() => dispatch(changeTodolistTitleAC(id, title)))
}

//Types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & { filter: FilterValuesType, status: StatusType }
type ActionsType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistStatusAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setAppStatusAC>
