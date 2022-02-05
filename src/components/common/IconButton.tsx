import React from 'react';
import CommonButton from "./CommonButton";
import {commonButtonPropsType} from "../../types/common";
import {ReactComponent as Settings} from "./../../assets/settings.svg";
import s from './../../styles/common.module.scss'
type propsT = commonButtonPropsType & {

}

const IconButton = (props:propsT) => {
    return (
        <div className={s.iconButton}>
            <CommonButton {...props}/>
            <Settings className={s.iconButton__icon}/>
        </div>
    );
};

export default IconButton;