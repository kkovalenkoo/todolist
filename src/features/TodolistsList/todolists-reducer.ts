import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
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
export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: 'SET-TODOLISTS', todolists
} as const)

//Thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    return todolistsAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))
}
export const deleteTodolistTC = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTodolist(id)
        .then(() => dispatch(removeTodolistAC(id)))
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTodolist(title)
        .then(res => dispatch(addTodolistAC(res.data.data.item)))
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolist(id, title)
        .then(() => dispatch(changeTodolistTitleAC(id, title)))
}

//Types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
type ActionsType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
