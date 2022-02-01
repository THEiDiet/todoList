import React, {useState} from 'react';
import Task from "./Task";

import {observer} from "mobx-react-lite";
import s from './../styles/todo.module.scss'
import c from './../styles/common.module.scss'
import {TaskType, TodoType} from "../types/common";
import todos from './../store/todo'

type propsType = {
    title: string
    todo: TodoType
    setCurrentTask:(todoId:string,task:TaskType)=>void
}

const Todo = observer(({title, todo,setCurrentTask}: propsType) => {
    let [inputValue, setInputValue] = useState('')
    const setNewTaskValue = (taskId: string, newText: string) => {
        todos.editTaskText(todo.id, taskId, newText)
    }
    const availableFilters = todos.filters.filter(f => !todo.filters.includes(f))
    console.log(availableFilters)
    return (
        <div className={s.todolist}>
            <div className={s.todolist__form}>
                <div className={s.todolist__form__filters}>
                    {todo.filters.map(f => <span className={s.todolist__form__filter}>{f} </span>)}
                    {
                        availableFilters.length > 1
                            ? <select onChange={(e) => {
                                todos.addTodoFilter(todo.id, e.target.value)
                            }}
                                      value={availableFilters[0]} name="filters">
                                {availableFilters.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            : availableFilters.length === 1
                                ? <button onClick={() => todos.addTodoFilter(todo.id, availableFilters[0])}>{availableFilters[0]}</button>
                                : <>filters is over</>
                    }
                </div>
                <div>
                    <select onChange={(e) => todos.changeTodoCategory(todo.id, e.target.value)} value={todo.category}
                            name="categories">
                        {todos.categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <h2 className={`${c.title} ${s.todolist__form__title}`}>{title} --- {todo.category}</h2>
                <div className={s.todolist__form__body}>
                    <input className={` ${c.input} ${s.todolist__form__input}`} type="text" value={inputValue}
                           onChange={(e) => setInputValue(e.currentTarget.value)}/>
                    <button className={` ${c.button} ${s.todolist__form__button}`}
                            onClick={() => todos.addNewTask(todo.id, inputValue)}>+++
                    </button>
                </div>
            </div>
            <div className={s.todolist__body}>
                {todo.tasks.map(t => <Task key={t.id} task={t} changeTaskValue={setNewTaskValue}
                                           setCurrentTask={(task)=>setCurrentTask(todo.id,task)}
                                           toggleCheckbox={(id) => todos.toggleTask(todo.id, id)}
                                           deleteTask={(id) => todos.deleteTask(todo.id, id)}
                />)}
            </div>
        </div>
    );
})

// @ts-ignore
window.store = todos
export default Todo;