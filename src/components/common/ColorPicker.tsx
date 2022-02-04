import React from 'react';
import {colorsKeys, selectColorsType} from "../../types/common";
import s from "../../styles/TaskSettings.module.scss";
import todo from "../../store/todo";
import darkTheme from "../../styles/DarkTheme.module.scss";
import lightTheme from "../../styles/LightTheme.module.scss";

type props = {
    currentColor:selectColorsType
    callback:(color:selectColorsType)=>void
}

const ColorPicker = ({callback,currentColor}:props) => {
    const currentTheme = todo.theme === 'dark' ? darkTheme : lightTheme
    const colorsNew = ["red", "aqua", "green", "blue", "violet",'inherit'] as selectColorsType[]
    const pickColor = (e: React.MouseEvent<HTMLDivElement>) => {
        let selectColor = e.target instanceof HTMLElement && e.target.dataset.color as selectColorsType
        selectColor && callback(selectColor)
    }
    return (
        <div className={s.colorPicker} onClick={(e) => pickColor(e)}>
            {colorsNew.map(c => <div className={` ${s.color} ${c !=='inherit' ? currentTheme[c] : currentTheme.bgElemColor} ${currentColor === c && currentTheme.activeBorderColor}`} data-color={c}/>)}
        </div>
    );
};

export default ColorPicker;