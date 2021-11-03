import React from 'react'
import App from '../App'
import {ReduxStoreProviderDecorator} from './redux-store-provider-decorator'
import {Meta, Story} from '@storybook/react'

export default {
    title: 'Todolists/App',
    component: App,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story = (args) => <App {...args}/>

export const AppExample = Template.bind({})
AppExample.args = {}