import React, {useState} from 'react';
import s from './../styles/Task.module.scss'
import c from './../styles/common.module.scss'
import MyButton from "./common/MyButton";
import MyInput from "./common/MyInput";

type props = {
    callback:(text:string)=>void
}

const AddPoint = ({callback}:props) => {
    // const [text,setText] = useState('')
    return (
        <div className={s.addPoint}>
            <MyInput callback={callback}/>
            {/*<input type="text" value={text} onChange={(e)=>setText(e.currentTarget.value)} />*/}
            {/*<MyButton callback={()=>callback(text)} mode={'add'} className={s.addPoint__add}/>*/}
            {/*<button onClick={}>Add</button>*/}
        </div>
    );
};

export default AddPoint;