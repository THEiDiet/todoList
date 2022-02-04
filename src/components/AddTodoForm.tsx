import React from 'react';
import s from './../styles/todo.module.scss'
import MyInput from "./common/MyInput";
import todos from "../store/todo";
import c from "../styles/common.module.scss";
import darkTheme from "../styles/DarkTheme.module.scss";
import lightTheme from "../styles/LightTheme.module.scss";

type propsType = {
    callback:(text:string)=>void
}

const AddTodoForm = ({callback}:propsType) => {
    const currentTheme = todos.theme === 'dark' ? darkTheme : lightTheme
    return (
        <div className={`${s.addTodoForm} ${currentTheme.bgElemColor} ${currentTheme.borderColor}`}>
            <h2 className={`${c.title} ${s.todolist__form__title}`}>Add your todo</h2>
            <MyInput callback={callback}/>
        </div>
    );
};

export default AddTodoForm;