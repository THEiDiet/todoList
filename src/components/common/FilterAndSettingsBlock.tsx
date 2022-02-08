import React from 'react';
import c from "../../styles/common.module.scss";
import s from "../../styles/App.module.scss";
import todo from "../../store/todo";
import darkTheme from "../../styles/DarkTheme.module.scss";
import lightTheme from "../../styles/LightTheme.module.scss";
import {ReactComponent as SunIcon} from "../../assets/sun.svg";
import {ReactComponent as MoonIcon} from "../../assets/moon.svg";
import Filters from "../Filters";
import IconButton from "./IconButton";

const FilterAndSettingsBlock = () => {
    const currentTheme = todo.theme === 'dark' ? darkTheme : lightTheme

    return (
        <>
            <div className={s.themeHandler} onClick={() => todo.changeTheme(todo.theme)}>
                {todo.theme === 'light' ? <SunIcon className={currentTheme.activeFillColor}/> :
                    <MoonIcon className={currentTheme.activeFillColor}/>}
            </div>
            <h3>Filters</h3>
            <Filters callback={(f) => todo.setFilter(f)} filters={todo.filters}
                     filtersDependencies={todo.currentFilter}/>
            <IconButton text={'clear filters'} cb={() => todo.clearFilters()} mode={'none'}/>
            <button className={`${c.button} ${s.addToLS} ${currentTheme.borderColor} ${currentTheme.hoverBgColor}`}
                    onClick={() => todo.saveToLocalStorage()}>Save changes
            </button>

        </>
    );
};

export default FilterAndSettingsBlock;