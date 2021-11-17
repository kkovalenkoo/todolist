import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer'
import {ResponseType} from '../api/api'
import {Dispatch} from 'redux'

export const handleServerError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) dispatch(setAppErrorAC(data.messages[0]))
    else dispatch(setAppErrorAC('some error'))
    dispatch(setAppStatusAC('failed'))
}

export const handleNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(error.message ? error.message : 'some error'))
}
