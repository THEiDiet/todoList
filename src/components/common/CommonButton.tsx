import React from 'react';
import c from './../../styles/common.module.scss'
import todo from "../../store/todo";
import darkTheme from "../../styles/DarkTheme.module.scss";
import lightTheme from "../../styles/LightTheme.module.scss";
import {commonButtonPropsType} from "../../types/common";

const CommonButton = ({cb,text,mode}:commonButtonPropsType) => {
    const currentTheme = todo.theme === 'dark' ? darkTheme : lightTheme

    return (

            <button className={`${c.button} ${mode === 'fulfilled' ? currentTheme.bgActive : mode === 'border' ? currentTheme.borderColor : ''}`} onClick={cb}>{text}</button>

    );
};

export default CommonButton;