import React, {useState} from 'react';

const AddPoint = ({callback}:{callback:(text:string)=>void}) => {
    const [text,setText] = useState('')
    return (
        <>
            <input type="text" value={text} onChange={(e)=>setText(e.currentTarget.value)}/>
            <button onClick={()=>callback(text)}>Add</button>
        </>
    );
};

export default AddPoint;