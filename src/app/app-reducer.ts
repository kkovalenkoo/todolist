import {Dispatch} from 'redux'
import {authAPI} from '../api/api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
    status: 'idle' as StatusType,
    error: null as ErrorType,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
        setAppStatusAC(state, action: PayloadAction<{ status: StatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: ErrorType }>) {
            state.error = action.payload.error
        },
    }
})

export const appReducer = slice.reducer
export const {setAppInitializedAC, setAppStatusAC, setAppErrorAC} = slice.actions

//Thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) dispatch(setIsLoggedInAC({isLoggedIn: true}))
        })
    dispatch(setAppInitializedAC({isInitialized: true}))
}

//Types
export type AppStateType = typeof initialState
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
