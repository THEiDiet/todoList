import React, {useEffect, useState} from 'react';
import {selectColorsType, TaskType} from "../../types/common";
import {observer} from "mobx-react-lite";
import todo from './../../store/todo'
import ColorPicker from "./ColorPicker";
import IconButton from "./IconButton";


const TaskSettings = observer(({taskItem}: { taskItem: TaskType }) => {
    const [task, setTask] = useState<TaskType>(taskItem)

    useEffect(() => {
        todo.currentTaskBody && setTask(todo.currentTaskBody)
    })

    const setColor = (selectColor: selectColorsType) => {
        setTask(prev=>({...prev,selectColor}))
        selectColor && todo.changeAllTask({...task, selectColor})
    }

    return (
        <div>
            <ColorPicker currentColor={task.selectColor} callback={setColor}/>
            <IconButton text={'settings'} cb={() => todo.setIsModalOpen()} mode={'none'}/>
        </div>

    );
})

export default TaskSettings;