import React, {useState} from 'react';
import Point from "./Point";
import EditableSpan from "./common/EditableSpan";
import {TaskType} from "../types/common";
import s from './../styles/todo.module.scss'
import c from './../styles/common.module.scss'
import {observer} from "mobx-react-lite";
import todo from './../store/todo'
import MyButton from "./common/MyButton";
import {ReactComponent as ArrowDown} from "./../assets/arrow.svg";
import Checkbox from "./common/Checkbox";
import todos from "../store/todo";
import darkTheme from "../styles/DarkTheme.module.scss";
import lightTheme from "../styles/LightTheme.module.scss";
import MyInput from "./common/MyInput";

type propsType = {
    task: TaskType
    todoId: string
    setCurrentTask: (task: string | null) => void
}

const Task = observer(({task, todoId, setCurrentTask}: propsType) => {
    const currentTheme = todos.theme === 'dark' ? darkTheme : lightTheme
    let [collapsed, setCollapsed] = useState(true)
    let [addMode, setAddMode] = useState(false)
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }
    const addNewPoint = (text: string) => {
        todo.addNewPoint(task.id, text)
        setAddMode(false)
    }

    const changeCheckbox = () => {
        todo.toggleTask(todoId, task.id)
    }

    return (
        <div
            className={`${s.todolist__task}  ${task.selectColor !== 'inherit' ? currentTheme[task.selectColor] : currentTheme.bgElemColor}`}>
            <div className={s.todolist__item} onClick={() => setCurrentTask(task.id)}>
                <div className={s.todolist__item_first}>
                    <Checkbox className={s.todolist__item__check} checked={task.isDone}
                              onChangeChecked={changeCheckbox}/>
                    <EditableSpan callback={(newText) => todo.editTaskText(todoId, task.id, newText)} text={task.text}/>
                </div>
                <div className={s.todolist__item_last}>
                    <div className={s.todolist__item_lastTop}>
                        <MyButton callback={() => todo.deleteTask(todoId, task.id)} mode={'delete'}/>
                        {!addMode && <MyButton callback={() => setAddMode(true)} mode={'add'}/>}
                        {todo.points[task.id].length > 0 &&
                        <ArrowDown className={`${c.iconBtn} ${c.arrowDown} ${currentTheme.fillColor}`}
                                   onClick={toggleCollapsed}/>}
                    </div>
                    {/*<div className={s.todolist__item_lastBottom}>{task.expire}</div>*/}
                </div>
            </div>
            <div className={s.todolist__points}>
                {addMode && <div className={s.addPoint}>
                    <MyInput callback={addNewPoint}/>
                </div>}
                {collapsed && todo.points[task.id].map(p => <Point
                    changePointValue={(text) => todo.editPointText(task.id, p.id, text)}
                    deletePoint={() => todo.deletePoint(task.id, p.id)}
                    toggleCheckbox={() => todo.togglePoint(task.id, p.id)}
                    key={p.id} point={p}/>)}
            </div>
        </div>
    );
})

export default Task;