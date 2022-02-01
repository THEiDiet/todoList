import React from 'react';
import {observer} from "mobx-react-lite";
import todo from './../../store/todo'

const Categories = observer(() => {
    return (
        <>
            {todo.categories.map(c => <div key={c} onClick={()=>todo.changeCategory(c)}>{c}</div>)}
            <div  onClick={()=>todo.changeCategory(null)}>all</div>
            <h4>current category - {todo.currentCategory}</h4>
        </>
    );
})

export default Categories;