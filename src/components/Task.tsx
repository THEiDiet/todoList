import React, {useState} from 'react';
import Point from "./Point";
import EditableSpan from "./common/EditableSpan";
import {TaskType} from "../types/common";
import s from './../styles/todo.module.scss'
import {observer} from "mobx-react-lite";
import todo from './../store/todo'
import AddPoint from "./AddPoint";


type propsType = {
    task: TaskType
    changeTaskValue: (id: string, text: string) => void
    toggleCheckbox: (id: string) => void
    deleteTask: (id: string) => void
    setCurrentTask:(task:TaskType)=>void
}

const Task = observer(({task, changeTaskValue, toggleCheckbox, deleteTask,setCurrentTask}: propsType) => {

    let [collapsed, setCollapsed] = useState(true)
    let [addMode,setAddMode] = useState(false)
    console.log(task.id)
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }
    const addNewPoint = (text:string)=> {
        todo.addNewPoint(task.id,text)
        setAddMode(false)
    }
    return (
        <div className={s.todolist__task}>
            <div className={s.todolist__item} onClick={()=>setCurrentTask(task)} style={{background:task.selectColor}}>
                <input type="checkbox" checked={task.isDone} onChange={() => toggleCheckbox(task.id)}/>
                <EditableSpan callback={(newText) => changeTaskValue(task.id, newText)} text={task.text}/>
                <div>{task.expire}</div>
                <button onClick={() => deleteTask(task.id)}>X</button>
                {todo.points[task.id].length > 0 && <button onClick={toggleCollapsed}>arrow down</button>}
            </div>
            <div className={s.todolist__points}>
                {collapsed  && todo.points[task.id].map(p => <Point
                    changePointValue={(text) => todo.editPointText(task.id, p.id, text)}
                    deletePoint={()=>todo.deletePoint(task.id, p.id)}
                    toggleCheckbox={()=>todo.togglePoint(task.id, p.id)}
                    key={p.id} point={p}/>)}
            </div>

            <div className={s.addPoint}>
                {!addMode && <button onClick={()=>setAddMode(true)}>ADD POINT</button>}
                {addMode && <AddPoint callback={addNewPoint}/>}
            </div>
        </div>
    );
})

export default Task;