import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './../../styles/MyCheckbox.module.scss'

type CheckboxPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    onChangeChecked?: (checked: boolean) => void
}

const MyCheckbox: React.FC<CheckboxPropsType> = (
    {
        type,
        onChange, onChangeChecked,
        className,
        children,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }
    return (
        <div className={s.checkContainer}>
            <input className={s.checkbox} id='checkbox' onChange={onChangeCallback}
                   type="checkbox" {...restProps}/>
            <label className={s.text} htmlFor="checkbox"/>
        </div>
    )
}

export default MyCheckbox;
