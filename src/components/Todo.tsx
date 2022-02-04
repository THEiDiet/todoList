import React, {useState} from 'react';
import Task from "./Task";
import {observer} from "mobx-react-lite";
import s from './../styles/todo.module.scss'
import c from './../styles/common.module.scss'
import {TaskType, TodoType} from "../types/common";
import todos from './../store/todo'
import MyButton from "./common/MyButton";
import lightTheme from './../styles/LightTheme.module.scss'
import darkTheme from './../styles/DarkTheme.module.scss'
import Select, {SingleValue} from "react-select";
import MySelect from "./common/MySelect";

type propsType = {
    title: string
    todo: TodoType

}
type selectType = SingleValue<{ value: string; label: string; }>
const Todo = observer(({title, todo}: propsType) => {
    let [inputValue, setInputValue] = useState('')
    const currentTheme = todos.theme === 'dark' ? darkTheme : lightTheme
    const availableFilters = todos.filters.filter(f => !todo.filters.includes(f)).map(f => ({value: f, label: f}))

    const getValue = (val: selectType) => {
        console.log(val)
        val && todos.addTodoFilter(todo.id, val.value)
    }

    return (
        <div className={`${s.todolist} ${currentTheme.bgElemColor} ${currentTheme.borderColor}`}>
            <div className={s.todolist__form}>
                <div className={s.todolist__form__filters}>
                    <div className={s.todolist__form__filter}>
                        {todo.filters.filter(el => el !== 'all').map(f => <span key={f} className={s.todolist__form__filter}
                                                                                onClick={() => todos.deleteTodoFilter(todo.id, f)}>{f}</span>)}

                    </div>
                    {availableFilters.length > 0 && <MySelect  className={s.todolist__form__filter_last} onChange={(val: selectType) => getValue(val)}
                                                              options={availableFilters}/>}
                </div>
                <div>
                    <select onChange={(e) => todos.changeTodoCategory(todo.id, e.target.value)} value={todo.category}
                            name="categories">
                        {todos.categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                </div>
                <h2 className={`${c.title} ${s.todolist__form__title}`}>{title} --- {todo.category}</h2>
                <div className={s.todolist__form__body}>
                    <input className={` ${c.input} ${s.todolist__form__input} ${currentTheme.formBg}`} type="text"
                           value={inputValue}
                           onChange={(e) => setInputValue(e.currentTarget.value)}/>
                    <MyButton className={`${s.todolist__form__button}`}
                              callback={() => todos.addNewTask(todo.id, inputValue)} mode={'add'}/>
                </div>
            </div>
            <div className={s.todolist__body}>
                {todo.tasks.map(t => {
                    return (
                        <Task key={t.id} task={t} todoId={todo.id}
                              setCurrentTask={(taskId) => todos.setCurrentTask({todoId:todo.id, taskId})}
                        />
                    )
                })}
            </div>
        </div>
    );
})

// @ts-ignore
window.store = todos
export default Todo;