import React from 'react'
import {Meta, Story} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {Task, TaskPropsType} from '../components/Task'

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
    task: {id: '1', isDone: true, title: 'js'}
}
export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    todolistId: '2',
    task: {id: '1', isDone: false, title: 'css'}
}