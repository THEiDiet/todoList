import React, {useState} from 'react';
import Point from "./Point";
import EditableSpan from "./common/EditableSpan";
import {TaskType} from "../types/common";
import s from './../styles/todo.module.scss'
import c from './../styles/common.module.scss'
import {observer} from "mobx-react-lite";
import todo from './../store/todo'
import AddPoint from "./AddPoint";
import theme from "./common/theme";
import MyButton from "./common/MyButton";
import {ReactComponent as ArrowDown} from "./../assets/arrow.svg";
import MyCheckbox from "./common/MyCheckbox";
import todos from "../store/todo";
import darkTheme from "../styles/DarkTheme.module.scss";
import lightTheme from "../styles/LightTheme.module.scss";

type propsType = {
    task: TaskType
    todoId:string
    setCurrentTask: (task: string | null) => void
}

const Task = observer(({task,todoId,setCurrentTask}: propsType) => {
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
    const changeCheckbox = ()=>{
        todo.toggleTask(todoId,task.id)
    }
    return (
        <div className={`${s.todolist__task} ${task.selectColor !== 'inherit' ? currentTheme[task.selectColor]: currentTheme.bgElemColor}`}>
            <div className={s.todolist__item} onClick={() => setCurrentTask(task.id)}>
               <div className={s.todolist__item_first}>
                   {/*<MyCheckbox checked={task.isDone} onChange={changeCheckbox}/>*/}
                   <input type="checkbox" checked={task.isDone} onChange={changeCheckbox}/>
                   <EditableSpan callback={(newText) => todo.editTaskText(todoId,task.id, newText)} text={task.text}/>
               </div>
                {/*<div>{task.expire}</div>*/}
                <div className={s.todolist__item_last}>
                    <MyButton callback={() => todo.deleteTask(todoId,task.id)} mode={'delete'}/>
                    {!addMode && <MyButton callback={() => setAddMode(true)} mode={'add'}/>}
                    {todo.points[task.id].length > 0 &&
                    <ArrowDown className={`${c.iconBtn} ${c.arrowDown} ${currentTheme.fillColor}`}
                               onClick={toggleCollapsed}/>}
                </div>

            </div>
            <div className={s.todolist__points}>
                {addMode && <AddPoint callback={addNewPoint}/>}
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