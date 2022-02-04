import React from 'react';
import {ReactComponent as Edit}  from './../../assets/edit.svg'
import {ReactComponent as Delete}  from './../../assets/del.svg'
import {ReactComponent as Add}  from './../../assets/add.svg'

import c from './../../styles/common.module.scss'
import todos from "../../store/todo";
import theme from "./theme";
import darkTheme from "../../styles/DarkTheme.module.scss";
import lightTheme from "../../styles/LightTheme.module.scss";

type propsType = {
    callback:()=>void
    mode?: modeType
    className?:string
}
export type modeType = 'add'| 'delete' | 'edit'
const MyButton = ({mode,callback,className}:propsType) => {
    const currentTheme = todos.theme === 'dark' ? darkTheme : lightTheme

    // const myTheme = todos.theme === 'dark' ? theme.dark : theme.light
    const finalClassName = `${c.iconBtn} ${className && className} ${currentTheme.fillColor} ${mode === 'add' && c.roundBtn}`
    let Component = mode === 'add' ? Add : mode === 'delete' ? Delete : Edit
    return (
        <>
            <Component className={finalClassName} onClick={callback}/>
        </>
    );
};

export default MyButton;