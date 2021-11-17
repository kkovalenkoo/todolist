import React from 'react'
import {action} from '@storybook/addon-actions'
import {Task, TaskPropsType} from '../features/TodolistsList/Todolist/Task/Task'
import {Meta, Story} from '@storybook/react'
import {TaskPriorities, TaskStatuses} from '../api/api'

export default {
    title: 'Todolists/Task',
    component: Task,
    argTypes: {},
    args: {
        changeTaskStatus: action('title change inside task'),
        changeTaskTitle: action('remove button inside task clicked'),
        removeTask: action('status changed inside task')
    }
} as Meta

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    todolistId: '1',
    task: {
        id: '1', status: TaskStatuses.Completed, title: 'js', todoListId: '1',
        order: 0, priority: TaskPriorities.Low, addedDate: '',
        startDate: '', deadline: '', description: ''
    }
}
export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    todolistId: '2',
    task: {
        id: '1', status: TaskStatuses.New, title: 'css', todoListId: '2',
        order: 0, priority: TaskPriorities.Low, addedDate: '',
        startDate: '', deadline: '', description: ''
    }
}