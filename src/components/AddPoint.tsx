import React, {useState} from 'react';
import s from './../styles/Task.module.scss'
import c from './../styles/common.module.scss'
import MyButton from "./common/MyButton";

const AddPoint = ({callback}:{callback:(text:string)=>void}) => {
    const [text,setText] = useState('')
    return (
        <div className={s.addPoint}>
            <input type="text" value={text} onChange={(e)=>setText(e.currentTarget.value)} />
            <MyButton callback={()=>callback(text)} mode={'add'} className={s.addPoint__add}/>
            {/*<button onClick={}>Add</button>*/}
        </div>
    );
};

export default AddPoint;