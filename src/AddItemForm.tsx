import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

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
            <input value={title} onChange={onChangeTitle} onKeyPress={onKeyPress}/>
            <button onClick={onAddTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}