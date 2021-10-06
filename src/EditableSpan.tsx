import React, {ChangeEvent, useState} from 'react'
import {TextField} from '@material-ui/core'

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <TextField variant={'outlined'} value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

}