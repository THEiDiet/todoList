import React, {ChangeEvent, useEffect, useState} from 'react';
import {TaskType} from "../../types/common";
import {observer} from "mobx-react-lite";
import todo from './../../store/todo'
import {TaskSettingsType} from "../../App";
import s from './../../styles/TaskSettings.module.scss'


const TaskSettings = observer(({task, todoId}: TaskSettingsType) => {
    const [error,setError] = useState('')
    const [payload, setPayload] = useState({
        text: task.text,
        selectColor: task.selectColor,
        expire: task.expire,
        isDone: task.isDone
    })
    const pickColor = (e: React.MouseEvent<HTMLDivElement>) => {
        let selectColor = e.target instanceof HTMLElement && e.target.dataset.color
        selectColor && setPayload({...payload, selectColor})
    }
    const renameTask =(e:ChangeEvent<HTMLInputElement>)=> {
        setPayload({...payload, text:e.currentTarget.value})
    }
    const setNewExpire = (e:ChangeEvent<HTMLInputElement>)=> {
        console.log(e.target.value)
        let choosingDate = e.target.value.split('-').map(e=>+e)
        let date = new Date()
        let realDate = [date.getFullYear(),date.getMonth()+1,date.getDate()]

        if(realDate.find((d,idx) => d > choosingDate[idx])){
            setError('date should be greater than now')
        }else{
            setError('')
            setPayload({...payload, expire: choosingDate.join(', ')})
        }

        console.log(realDate+' real', choosingDate+ ' choosing')
        // setPayload({...payload, expire:e.target.value})
    }
    useEffect(() => {
        setPayload({text: task.text, selectColor: task.selectColor, expire: task.expire, isDone: task.isDone})
    }, [task])
    return (
        <div>
            {task.selectColor}
            {task.expire}
            {todoId}
            <input type="date"  onChange={(e)=>setNewExpire(e)}/>
            <input type="text" value={payload.text}onChange={(e)=>renameTask(e)}/>
            <div className={s.colorPicker} onClick={(e) => pickColor(e)}>
                {todo.selectColors.map(c => <div className={s.color} data-color={c} style={{background: c}}/>)}
            </div>
            <button disabled={!!error} onClick={() => todo.changeTaskSettings(todoId, task.id, payload)}>Change settings</button>
            <div>change expired</div>
            {error && <div>{error}</div>}
        </div>
    );
})

export default TaskSettings;