import {Dispatch} from 'redux'
import {authAPI, LoginDataType} from '../../api/api'
import {handleNetworkError, handleServerError} from '../../utils/error-utils'
import {setAppStatusAC} from '../../app/app-reducer'

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

//Actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
    type: 'LOGIN/SET-IS-LOGGED-IN', isLoggedIn
} as const)

//Thunks
export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
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
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>



