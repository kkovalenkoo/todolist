import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer'
import {ResponseType} from '../api/api'
import {Dispatch} from 'redux'

export const handleServerError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) dispatch(setAppErrorAC({error: data.messages[0]}))
    else dispatch(setAppErrorAC({error: 'some error'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'failed'}))
    dispatch(setAppErrorAC({error: error.message ? error.message : 'some error'}))
}
