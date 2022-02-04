import React from 'react';
import {observer} from "mobx-react-lite";
import todo from './../../store/todo'
import s from './../../styles/Categories.module.scss'
import darkTheme from "../../styles/DarkTheme.module.scss";
import lightTheme from "../../styles/LightTheme.module.scss";

const Categories = observer(() => {
    const currentTheme = todo.theme === 'dark' ? darkTheme : lightTheme
    return (
        <div className={`${s.categories} ${currentTheme.bgElemColor}`}>
            {todo.categories.map(c => <div className={`${s.categoryItem} ${todo.currentCategory === c ? currentTheme.bgActive : ''}`} key={c} onClick={()=>todo.changeCategory(c)}>{c}</div>)}
            <div className={`${s.categoryItem} ${todo.currentCategory === null ? currentTheme.bgActive : ''}`} onClick={()=>todo.changeCategory(null)}>all</div>
        </div>
    );
})

export default Categories;