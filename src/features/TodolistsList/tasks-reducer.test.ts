
import {addTodolistAC, removeTodolistAC} from './todolists-reducer'
import {TaskPriorities, TaskStatuses} from '../../api/todolists-api'
import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksStateType, updateTaskAC} from './tasks-reducer'
import {v1} from 'uuid'

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1',
                order: 0, priority: TaskPriorities.Low, addedDate: '',
                startDate: '', deadline: '', description: ''
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                order: 0, priority: TaskPriorities.Low, addedDate: '',
                startDate: '', deadline: '', description: ''
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1',
                order: 0, priority: TaskPriorities.Low, addedDate: '',
                startDate: '', deadline: '', description: ''
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2',
                order: 0, priority: TaskPriorities.Low, addedDate: '',
                startDate: '', deadline: '', description: ''
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                order: 0, priority: TaskPriorities.Low, addedDate: '',
                startDate: '', deadline: '', description: ''
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2',
                order: 0, priority: TaskPriorities.Low, addedDate: '',
                startDate: '', deadline: '', description: ''
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('todolistId2', '2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        id: v1(),
        todoListId: 'todolistId2',
        title: 'juice',
        status: TaskStatuses.New,
        description: '',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: ''
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const action = updateTaskAC('todolistId2', '2', {status: TaskStatuses.New}, )

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
    const action = updateTaskAC('todolistId2', '2', {title: 'yogurt'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('yogurt')
    expect(endState['todolistId2'][0].title).toBe('bread')
})

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        id: v1(),
        title: 'new todolist',
        order: 0,
        addedDate: ''
    })

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('properties with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('tasks should be added for todolist', () => {

    const action = setTasksAC(startState['todolistId1'], 'todolistId1')

    const endState = tasksReducer({'todolistId1': []}, action)

    expect(endState['todolistId1'].length).toBe(3)

})