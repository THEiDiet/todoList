import React from 'react';
import {observer} from "mobx-react-lite";
import todo from './../store/todo'
import c from './../styles/common.module.scss'
import darkTheme from "../styles/DarkTheme.module.scss";
import lightTheme from "../styles/LightTheme.module.scss";
import {FiltersType} from "../types/common";

type props = {
    callback: (filter: FiltersType) => void
    filters: FiltersType[]
    filtersDependencies: FiltersType[]
}

const Filters = observer(({callback, filters, filtersDependencies}: props) => {
    const currentTheme = todo.theme === 'dark' ? darkTheme : lightTheme
    const onClickHandler = (f: FiltersType) => {
        callback(f)
    }
    return (
        <div className={c.filter}>
            {filters.map(f => {
                let filterClassValue = ''
                    if (filtersDependencies.includes(f)) {
                        filterClassValue = currentTheme.bgActive
                    } else if (f === 'not important' && filtersDependencies.includes('important' as FiltersType)) {
                        filterClassValue = currentTheme.disabled
                    } else if (f === 'important' && filtersDependencies.includes('not important' as FiltersType)) {
                        filterClassValue = currentTheme.disabled
                    } else if (f === 'urgently' && filtersDependencies.includes('not urgently' as FiltersType)) {
                        filterClassValue = currentTheme.disabled
                    } else if (f === 'not urgently' && filtersDependencies.includes('urgently' as FiltersType)) {
                        filterClassValue = currentTheme.disabled
                    }

                return (<>
                        <button className={`${c.filter__item} ${currentTheme.borderColor} ${currentTheme.fontColor} ${filterClassValue} ${currentTheme.hoverBgColor}`}
                                key={f}  onClick={() => onClickHandler(f)}>{f}
                        </button>
                    </>
                )
            })}
        </div>
    );
})

export default Filters;
//${todo.currentFilter.find(i => i === f) ? currentTheme.bgActive : 'none'}