import React from 'react';
import CommonButton from "./CommonButton";
import {commonButtonPropsType} from "../../types/common";
import {ReactComponent as Settings} from "./../../assets/settings.svg";
import s from './../../styles/common.module.scss'
import todo from "../../store/todo";
import darkTheme from "../../styles/DarkTheme.module.scss";
import lightTheme from "../../styles/LightTheme.module.scss";

type propsT = commonButtonPropsType & {}

const IconButton = (props: propsT) => {
    const currentTheme = todo.theme === 'dark' ? darkTheme : lightTheme

    return (
        <div className={s.iconButton}>
            <CommonButton {...props}/>
            <Settings className={`${s.iconButton__icon} ${currentTheme.fillColor}`}/>
        </div>
    );
};

export default IconButton;