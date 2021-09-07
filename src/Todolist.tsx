import React from 'react';
import {FilterType, TaskType} from './App';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (filterValue: FilterType) => void
}

export function Todolist(props: TodolistPropsType) {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveTask = () => {
                            props.removeTask(t.id)
                        }

                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveTask}>x</button>
                            </li>
                        );
                    })
                }
            </ul>
            <div>
                <button onClick={() => {props.changeFilter('all')}}>All</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    );
}