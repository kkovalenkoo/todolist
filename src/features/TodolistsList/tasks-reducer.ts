import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.domainModel} : t)
            }
        case 'SET-TASK':
            return {...state, [action.todolistId]: action.tasks}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        default:
            return state
    }
}

//Actions
export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: 'REMOVE-TASK', todolistId, taskId
} as const)
export const addTaskAC = (task: TaskType) => ({
    type: 'ADD-TASK', task
} as const)
export const updateTaskAC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskType) => ({
    type: 'UPDATE-TASK', todolistId, taskId, domainModel
} as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({
    type: 'SET-TASK', tasks, todolistId
} as const)

//Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTasks(todolistId)
        .then(res => dispatch(setTasksAC(res.data.items, todolistId)))
}
export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTask(todolistId, taskTitle)
        .then(res => dispatch(addTaskAC(res.data.data.item)))
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    return todolistsAPI.deleteTask(todolistId, taskId)
        .then(() => dispatch(removeTaskAC(todolistId, taskId)))
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskType) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const apiModel: UpdateTaskModelType = {
                status: task.status,
                title: task.title,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...domainModel
            }
            todolistsAPI.updateTask(todolistId, taskId, apiModel)
                .then(() => dispatch(updateTaskAC(todolistId, taskId, domainModel)))
        }
    }

//Types
export type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {[key: string]: TaskType[]}
type ActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>



