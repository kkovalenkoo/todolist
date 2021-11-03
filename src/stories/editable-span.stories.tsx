import React from 'react'
import {action} from '@storybook/addon-actions'
import {EditableSpan, EditableSpanPropsType} from '../components/EditableSpan'
import {Meta, Story} from '@storybook/react'

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