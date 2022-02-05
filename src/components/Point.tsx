import React from 'react';
import EditableSpan from "./common/EditableSpan";
import {PointType} from "../types/common";
import s from './../styles/todo.module.scss'
import MyButton from "./common/MyButton";
import Checkbox from "./common/Checkbox";

type propsType = {
    point: PointType
    changePointValue: (text: string) => void
    deletePoint: () => void
    toggleCheckbox: () => void
}

const Point = ({point, changePointValue, deletePoint, toggleCheckbox}: propsType) => {
    return (
        <div className={`${s.todolist__item} ${s.point__item}`}>
            <div className={`${s.todolist__item_first}`}>
                <Checkbox onChangeChecked={toggleCheckbox} checked={point.isDone} className={s.todolist__item__check}/>
                {/*<input type="checkbox" checked={point.isDone} onChange={toggleCheckbox}/>*/}
                <EditableSpan callback={(text) => changePointValue(text)} text={point.text}/>
            </div>
            <div className={`${s.todolist__item_last}`}>
                <MyButton callback={deletePoint} mode={'delete'}/>
            </div>
        </div>
    );
}

export default Point;