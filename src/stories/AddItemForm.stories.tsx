import React from 'react'
import {AddItemForm, AddItemFormPropsType} from '../components/AddItemForm'
import {Meta, Story} from '@storybook/react'
import {action} from '@storybook/addon-actions'

export default {
    title: 'Todolists/AddItemForm',
    component: AddItemForm,
    argTypes: {},
} as Meta

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args}/>

export const AddItemFormExample = Template.bind({})
AddItemFormExample.args = {
    addItem: action('Button inside form clicked')
}