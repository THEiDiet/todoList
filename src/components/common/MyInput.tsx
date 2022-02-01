import React from 'react';

type FilteredTodoType = {
    text:string
    setText:(text:string)=>void
    onClickHandler:()=>void
}

const MyInput = ({text,setText,onClickHandler}:FilteredTodoType) => {
    return (
        <div>
            <input type="text" value={text} onChange={e => setText(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Add Todolist</button>
        </div>
    );
};

export default MyInput;