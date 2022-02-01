import React from 'react';
import todo from "../store/todo";
import {observer} from "mobx-react-lite";
import s from './../styles/FilteredTodos.module.scss'
import {TodoType} from "../types/common";

type propsType = {
    todos:TodoType[]
}

const FilteredTodos = observer(({todos}:propsType) => {
    return (
        <div className={s.filteredContainer}>
            {todos.map(t=> <div key={t.id} onClick={()=>todo.chooseTodo(t.id)}>{t.title}</div>)}
            {/*<div>*/}
            {/*    ---*/}
            {/*    all todos*/}
            {/*    ---*/}
            {/*    {todo.todos.map(t => <div key={t.id}>{t.title}</div>)}*/}
            {/*</div>*/}
        </div>

    );
})

export default FilteredTodos;