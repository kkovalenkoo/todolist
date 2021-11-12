import {v1} from 'uuid'
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistStatusAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC, setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer'
import {tasksReducer} from './tasks-reducer'
import {StatusType} from '../../app/app-reducer'

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', status: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', status: 'idle', addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const newTodolistTitle = {
        id: v1(),
        title: 'What to learn',
        order: 0,
        addedDate: ''
    }
    const action = addTodolistAC(newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle.title)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const action = changeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('correct status of todolist should be changed', () => {
    let newStatus: StatusType = 'loading'

    const action = changeTodolistStatusAC(todolistId2, newStatus)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].status).toBe('idle')
    expect(endState[1].status).toBe(newStatus)
})

test('todolist should be set to the state', () => {

    let action = setTodolistsAC(startState)

    let endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})

test('empty array should be added when we set todolists', () => {
    const action = setTodolistsAC([
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()

})

