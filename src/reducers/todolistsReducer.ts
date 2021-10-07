import {FilterType, TodolistType} from '../App'
import {v1} from 'uuid'

type ActionType =
    ReturnType<typeof removeTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof changeTodolistTitle>
    | ReturnType<typeof changeTodolistFilter>

export function todolistsReducer(state: TodolistType[], action: ActionType) {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistType = {id: v1(), title: action.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default: {
            return state
        }
    }
}

const removeTodolist = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST', todolistId
} as const)
const addTodolist = (title: string) => ({
    type: 'ADD-TODOLIST', title
} as const)
const changeTodolistTitle = (todolistId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', todolistId, title
} as const)
const changeTodolistFilter = (todolistId: string, filter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER', todolistId, filter
} as const)