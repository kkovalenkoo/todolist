const initialState = {
    status: 'idle' as StatusType,
    error: null as ErrorType
}

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//Actions
export const setAppErrorAC = (error: ErrorType) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: StatusType) => ({type: 'APP/SET-STATUS', status} as const)

//Types
export type AppStateType = typeof initialState
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
type ActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
