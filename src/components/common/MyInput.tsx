import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import s from './../../styles/common.module.scss'
import MyButton from "./MyButton";
import todos from "../../store/todo";
import darkTheme from "../../styles/DarkTheme.module.scss";
import lightTheme from "../../styles/LightTheme.module.scss";

type props = {
    callback?:(text:string)=>void
    editableText?:string
    onBlur?:()=>void
    mode?:'none'
    onChange?:(text:string)=>void
}

const MyInput = ({callback,editableText,onBlur,mode,onChange}:props) => {
    const currentTheme = todos.theme === 'dark' ? darkTheme : lightTheme

    const [text,setText] = useState(editableText || '')

    const clickHandler = ()=> {
        callback && callback(text)
        setText('')
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setText(e.currentTarget.value)
        onChange && onChange(e.currentTarget.value)
    }

    const onKeyPress = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)=>{
        if (e.key === 'Enter') {
            callback && callback(text)
        } else if (e.key === 'Escape') {
            editableText && callback &&  callback(editableText)
        }
    }

    return (
        <div className={s.addForm}>
            <input className={`${s.input} ${currentTheme.formBg}`} type="text" autoFocus
                   value={text} onChange={onChangeHandler}
                     onKeyUp={onKeyPress} onBlur={onBlur}
            />
            { mode !=='none' && <MyButton callback={clickHandler} mode={'add'} className={s.addForm__add}/>}
        </div>
    );
};

export default MyInput;