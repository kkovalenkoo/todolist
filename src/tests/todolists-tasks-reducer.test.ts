
import {addTodolistAC, TodolistDomainType, todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {tasksReducer, TasksStateType} from '../features/TodolistsList/tasks-reducer'
import {v1} from 'uuid'

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC({
        id: v1(),
        title: 'new todolist',
        order: 0,
        addedDate: ''
    })

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]

    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})
