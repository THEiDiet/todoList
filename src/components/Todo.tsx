import React from 'react';
import Task from "./Task";
import {observer} from "mobx-react-lite";
import s from './../styles/todo.module.scss'
import {FiltersType, TodoType} from "../types/common";
import todos from './../store/todo'
import MyButton from "./common/MyButton";
import lightTheme from './../styles/LightTheme.module.scss'
import darkTheme from './../styles/DarkTheme.module.scss'
import {SingleValue} from "react-select";
import MySelect from "./common/MySelect";
import MyInput from "./common/MyInput";
import EditableSpan from "./common/EditableSpan";
import Filters from "./Filters";

type propsType = {
    title: string
    todo: TodoType

}
const Todo = observer(({title, todo}: propsType) => {
    const currentTheme = todos.theme === 'dark' ? darkTheme : lightTheme
    const categories = todos.categories.map(f => ({value: f, label: f}))
    const currentCategory = categories.filter(f => f.value === todo.category)
    const onChangeHandler = (e: SingleValue<{ value: string; label: string; }>) => {
        e && todos.changeTodoCategory(todo.id, e.value)
    }
    return (
        <div className={`${s.todolist} ${currentTheme.bgElemColor} ${currentTheme.borderColor}`}>

            <div className={s.todolist__form}>
                <EditableSpan text={title} callback={(title) => todos.editTodoListTitle(todo.id, title)}
                              className={s.todolist__title} spanClassName={s.todolist__title_span}/>

                <div className={s.todolist__form__body}>
                    <MyInput callback={(value) => todos.addNewTask(todo.id, value)}/>
                </div>
            </div>
            <div className={s.todolist__body}>
                {todo.tasks.map(t => {
                    return (
                        <Task key={t.id} task={t} todoId={todo.id}
                              setCurrentTask={(taskId) => todos.setCurrentTask({todoId: todo.id, taskId})}
                        />
                    )
                })}
            </div>
            <div className={s.todolist__settings}>
                <MyButton callback={() => todos.deleteTodoList(todo.id)} mode={'delete'}/>
                <MySelect options={categories} defaultValue={currentCategory} placeholder={'Choose category'} autoFocus={false} value={currentCategory}
                          onChange={onChangeHandler}/>
            </div>
            <div className={s.todolist__form__filters}>
                <Filters callback={(f) => todos.addTodoFilter(todo.id, f)} filters={todos.filters}
                         filtersDependencies={todo.filters as FiltersType[]}/>
            </div>
        </div>
    );
})

export default Todo;