import React from 'react'
import {App, AppPropsType} from '../app/App'
import {ReduxStoreProviderDecorator} from './redux-store-provider-decorator'
import {Meta, Story} from '@storybook/react'

export default {
    title: 'Todolists/App',
    component: App,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story<AppPropsType> = (args) => <App {...args}/>

export const AppExample = Template.bind({})
AppExample.args = {demo: true}