import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {IconButton, TextField} from '@material-ui/core'
import {AddBox} from '@material-ui/icons'

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onAddTask = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            onAddTask()
        }
    }

    return (
        <div>
            <TextField variant={'outlined'}
                       value={title}
                       onChange={onChangeTitle}
                       onKeyPress={onKeyPress}
                       error={!!error}
                       label={'Title'}
                       helperText={error}
            />
            <IconButton color={'primary'} onClick={onAddTask}>
                <AddBox/>
            </IconButton>
        </div>
    )
}