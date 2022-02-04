import React, {useState} from 'react';
import s from './../../styles/common.module.scss'
import MyButton from "./MyButton";
import todos from "../../store/todo";
import darkTheme from "../../styles/DarkTheme.module.scss";
import lightTheme from "../../styles/LightTheme.module.scss";

const MyInput = ({callback}:{callback:(text:string)=>void}) => {

    const currentTheme = todos.theme === 'dark' ? darkTheme : lightTheme
    const clickHandler = ()=> {
        callback(text)
        setText('')
    }
    const [text,setText] = useState('')
    return (
        <div className={s.addForm}>
            <input className={`${s.input} ${currentTheme.formBg}`} type="text" autoFocus
                   value={text} onChange={(e)=>setText(e.currentTarget.value)} />
            <MyButton callback={clickHandler} mode={'add'} className={s.addForm__add}/>
        </div>
    );
};

export default MyInput;