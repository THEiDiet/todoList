import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from "../../styles/MyCheckbox.module.scss";
import {ReactComponent as Check} from './../../assets/check.svg'
import todo from "../../store/todo";
import darkTheme from "../../styles/DarkTheme.module.scss";
import lightTheme from "../../styles/LightTheme.module.scss";

type CheckboxPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    onChangeChecked: (checked: boolean) => void
}
const Checkbox = ({
                      type, checked,
                      onChange, onChangeChecked,
                      className,
                      children,
                      ...restProps
                  }: CheckboxPropsType
) => {
    const currentTheme = todo.theme === 'dark' ? darkTheme : lightTheme

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeChecked(e.currentTarget.checked)
    }
    return (
        <div className={`${currentTheme.contentCheckbox} ${currentTheme.fontColor} ${className && className}`}>
            {checked && <Check className={`${s.check} ${currentTheme.strokeColor}`}/>}
            <input className={currentTheme.contentCheckbox__checkbox}
                   onChange={onChangeCallback}
                   checked={checked}
                   type="checkbox" {...restProps}/>
        </div>
    )
}
export default Checkbox;