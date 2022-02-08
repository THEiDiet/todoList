import React, {useState} from 'react';
import MyInput from "./MyInput";
import s from './../../styles/common.module.scss'

type propsType = {
    text: string
    callback: (text: string) => void
    mode?: 'none'
    className?: string
    spanClassName?: string

}

const EditableSpan = ({text, callback, mode, className, spanClassName}: propsType) => {
    let [editMode, setEditMode] = useState(false)
    let [inputText, setInputText] = useState(text)

    const setText = (str: string) => {
        setInputText(str)
        callback(str)
        setEditMode(!editMode)
    }
    const finalClassContainer = `${s.editableSpanContainer} ${className ? className : ''}`
    const finalClass = `${s.editableSpan} ${spanClassName ? spanClassName : ''}`
    return (
        <div className={finalClassContainer}>
            {
                editMode &&
                <MyInput mode={'none'} callback={setText} editableText={inputText}
                         onBlur={() => setEditMode(!editMode)}/>
            }
            {
                !editMode &&
                <span className={finalClass} onDoubleClick={() => setEditMode(!editMode)}>{text}</span>
            }
        </div>
    );
};

export default EditableSpan;