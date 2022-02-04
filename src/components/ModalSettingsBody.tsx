import React, {ChangeEvent, useEffect, useState} from 'react';
import todo from "../store/todo";
import darkTheme from "../styles/DarkTheme.module.scss";
import lightTheme from "../styles/LightTheme.module.scss";
import {selectColorsType, TaskType} from "../types/common";
import ColorPicker from "./common/ColorPicker";

type props = {task:TaskType}

const ModalSettingsBody = ({task}:props) => {
    const currentTheme = todo.theme === 'dark' ? darkTheme : lightTheme
    const [editTask, setTask] = useState<TaskType>(task)
    const [error, setError] = useState('')
    const saveHandler = () => {
        todo.changeAllTask(editTask)
        todo.setIsModalOpen()
        todo.setCurrentTask({todoId:null,taskId:null})
    }

    const renameTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTask({...editTask, text:e.currentTarget.value})
    }
    const setNewExpire = (e: ChangeEvent<HTMLInputElement>) => {
        let choosingDate = e.target.value.split('-').map(e => +e)
        let date = new Date()
        let realDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()]

        if (realDate.find((d, idx) => d > choosingDate[idx])) {
            setError('date should be greater than now')
        } else {
            setError('')
        }
    }
    const setColor = (selectColor: selectColorsType) => {
        setTask(prev=>({...prev,selectColor}))
    }
    return (
        <div>
            <input type="date" onChange={(e) => setNewExpire(e)}/>
            <ColorPicker currentColor={editTask.selectColor} callback={setColor}/>
            <input value={editTask.text} onChange={renameTask}/>
            <button disabled={!!error} onClick={saveHandler}>save</button>
            <div>{error}</div>
        </div>
    );
};

export default ModalSettingsBody;