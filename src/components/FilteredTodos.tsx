import React from 'react';
import todo from "../store/todo";
import {observer} from "mobx-react-lite";
import s from './../styles/FilteredTodos.module.scss'
import {TodoType} from "../types/common";
import darkTheme from "../styles/DarkTheme.module.scss";
import lightTheme from "../styles/LightTheme.module.scss";

type propsType = {
    todos: TodoType[]
}

const FilteredTodos = observer(({todos}: propsType) => {
    const currentTheme = todo.theme === 'dark' ? darkTheme : lightTheme

    return (
        <div className={s.filteredContainer}>
            {todos.map((t, i) => <div className={`${s.filteredItem} ${currentTheme.bgElemColor}`} key={t.id}
                                      onClick={() => todo.chooseTodo(t.id)}>
                <span className={`${s.item__color} ${currentTheme.bgActive}`}/>
                <span className={s.item__text}>{t.title}</span>
            </div>)}
        </div>

    );
})

export default FilteredTodos;