import {Dispatch} from 'redux'
import {authAPI} from '../api/api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'

const initialState = {
    status: 'idle' as StatusType,
    error: null as ErrorType,
    isInitialized: false
}

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

//Actions
export const setAppErrorAC = (error: ErrorType) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: StatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED',
    isInitialized
} as const)

//Thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) dispatch(setIsLoggedInAC(true))
        })
    dispatch(setAppInitializedAC(true))
}

//Types
export type AppStateType = typeof initialState
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
type ActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppInitializedAC>
