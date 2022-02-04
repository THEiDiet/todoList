import React, {useEffect, useState} from 'react';
import s from './../../styles/Modal.module.scss'
import todo from "../../store/todo";
import darkTheme from "../../styles/DarkTheme.module.scss";
import lightTheme from "../../styles/LightTheme.module.scss";
import {observer} from "mobx-react-lite";
import {TaskType} from "../../types/common";
import ModalSettingsBody from "../ModalSettingsBody";

type props = {task:TaskType}

const Modal = observer((props:props) => {
    const currentTheme = todo.theme === 'dark' ? darkTheme : lightTheme

    return (
        <div className={`${s.modal} ${currentTheme.borderColor}`}>
            <ModalSettingsBody {...props}/>
        </div>
    );
})

export default Modal;