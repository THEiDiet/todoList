import React from 'react';
import EditableSpan from "./common/EditableSpan";
import {PointType} from "../types/common";
import s from './../styles/todo.module.scss'

type propsType = {
    point: PointType
    changePointValue:(text:string)=>void
    deletePoint:()=>void
    toggleCheckbox:()=>void
}

const Point = ({point,changePointValue,deletePoint,toggleCheckbox}:propsType) => {
        console.log('rerender point')
    return (
        <div className={s.point__item}>
            <input type="checkbox" checked={point.isDone} onChange={toggleCheckbox}/>
            <EditableSpan callback={(text)=>changePointValue(text)} text={point.text}/>
            <button onClick={deletePoint}>delete</button>
        </div>
    );
}

export default Point;