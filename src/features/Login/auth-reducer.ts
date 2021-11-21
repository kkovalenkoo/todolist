import {Dispatch} from 'redux'
import {authAPI, LoginDataType} from '../../api/api'
import {handleNetworkError, handleServerError} from '../../utils/error-utils'
import {setAppStatusAC} from '../../app/app-reducer'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

//Thunks
export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
        })
}

//Types
export type AuthType = typeof initialState
