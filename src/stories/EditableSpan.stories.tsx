import React from 'react'
import {Meta, Story} from '@storybook/react'
import {EditableSpan, EditableSpanPropsType} from '../components/EditableSpan'
import {action} from '@storybook/addon-actions'

export default {
    title: 'Todolists/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'value changed'
        },
        value: {
            defaultValue: 'Hi'
        }
    },
} as Meta

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args}/>

export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
    onChange: action('value changed')
}