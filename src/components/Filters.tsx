import React from 'react';
import {observer} from "mobx-react-lite";
import todo from './../store/todo'
import c from './../styles/common.module.scss'
import todos from "../store/todo";
import darkTheme from "../styles/DarkTheme.module.scss";
import lightTheme from "../styles/LightTheme.module.scss";
import {FiltersType} from "../types/common";

type props = {
    callback:(filter:FiltersType)=>void
}

const Filters = observer(({callback}:props) => {
    const currentTheme = todos.theme === 'dark' ? darkTheme : lightTheme
    console.log(todo.currentFilter)
    return (
        <div className={c.filter}>
            {todo.filters.map(f => <div className={`${c.filter__item} ${currentTheme.borderColor} 
            ${todo.currentFilter === f ? currentTheme.bgActive : 'none'}`}
            key={f} onClick={() => callback(f)}>{f}</div>)}
        </div>
    );
})

export default Filters;