import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../../api/api'
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {setAppStatusAC} from '../../app/app-reducer'
import {handleNetworkError, handleServerError} from '../../utils/error-utils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) tasks.splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, domainModel: UpdateDomainTaskType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: TaskType[], todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers(builder) {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
    }
})

export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions

//Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    taskAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(setTasksAC({tasks: res.data.items, todolistId}))
        })
}
export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    taskAPI.createTask(todolistId, taskTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(addTaskAC({task: res.data.data.item}))
            } else {
                handleServerError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    return taskAPI.deleteTask(todolistId, taskId)
        .then(() => dispatch(removeTaskAC({todolistId, taskId})))
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
            taskAPI.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) dispatch(updateTaskAC({todolistId, taskId, domainModel}))
                    else {
                        handleServerError(res.data, dispatch)
                    }
                })
                .catch(error => {
                    handleNetworkError(error, dispatch)
                })
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
export type TasksStateType = { [key: string]: TaskType[] }
