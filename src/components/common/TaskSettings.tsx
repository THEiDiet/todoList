import React, {ChangeEvent, useEffect, useState} from 'react';
import {colorsKeys, selectColorsType, TaskSettingsType, TaskType} from "../../types/common";
import {observer} from "mobx-react-lite";
import todo from './../../store/todo'
import s from './../../styles/TaskSettings.module.scss'
import darkTheme from "../../styles/DarkTheme.module.scss";
import lightTheme from "../../styles/LightTheme.module.scss";
import ColorPicker from "./ColorPicker";


const TaskSettings = observer(({taskItem}: { taskItem: TaskType }) => {
    const currentTheme = todo.theme === 'dark' ? darkTheme : lightTheme
    const [task, setTask] = useState<TaskType>(taskItem)

    useEffect(() => {
        todo.currentTaskBody && setTask(todo.currentTaskBody)
    }, [todo.currentTask])

    const setColor = (selectColor: selectColorsType) => {
        setTask(prev=>({...prev,selectColor}))
        selectColor && todo.changeAllTask({...task, selectColor})
    }

    return (
        <div>
            <ColorPicker currentColor={task.selectColor} callback={setColor}/>
            <button onClick={() => todo.setIsModalOpen()}>All settings</button>
        </div>

    );
})

export default TaskSettings;