import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';

type propsType = {
    text:string
    callback:(text:string)=> void
}

const EditableSpan = ({text,callback}:propsType) => {
    let [editMode,setEditMode] = useState(false)
    let [inputText,setInputText] = useState(text)
    const changeEditMode = () => {
        setEditMode(!editMode)
    }
    const onChangeText = (e:ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
    }
    const onPressEnter = (e:DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if(e.key === 'Enter') {
            callback(inputText)
            setEditMode(!editMode)
        }
    }
    return (
        <>
            {
                editMode &&
                <div>
                    <input type="text" value={inputText} autoFocus onChange={onChangeText} onBlur={changeEditMode} onKeyPress={onPressEnter}/>
                </div>
            }
            {
                !editMode &&
                <div onDoubleClick={changeEditMode}>
                    <span>{text}</span>
                </div>
            }
        </>
    );
};

export default EditableSpan;