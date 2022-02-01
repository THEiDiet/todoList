import React from 'react';
import {observer} from "mobx-react-lite";
import todo from './../store/todo'

const Filters = observer(() => {
    return (
        <div>
            <h4>{todo.currentFilter}</h4>
            {todo.filters.map(f => <button key={f} onClick={()=>todo.setFilter(f)}>{f} </button>)}
        </div>
    );
})

export default Filters;