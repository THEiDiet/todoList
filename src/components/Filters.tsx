import React from 'react';
import {observer} from "mobx-react-lite";
import todo from './../store/todo'
import c from './../styles/common.module.scss'
import todos from "../store/todo";
import darkTheme from "../styles/DarkTheme.module.scss";
import lightTheme from "../styles/LightTheme.module.scss";

const Filters = observer(() => {
    const currentTheme = todos.theme === 'dark' ? darkTheme : lightTheme
    return (
        <div className={c.filter}>
            {todo.filters.map(f => <div className={`${c.filter__item} ${currentTheme.borderColor} 
            ${todo.currentFilter === f ? currentTheme.bgActive : 'none'}`}
            key={f} onClick={() => todo.setFilter(f)}>{f}</div>)}
        </div>
    );
})

export default Filters;