import React from 'react';
import Select, {GroupBase, Props} from "react-select";
import todos from "../../store/todo";
import myTheme from '../../theme/theme'
import darkTheme from "../../styles/DarkTheme.module.scss";
import lightTheme from "../../styles/LightTheme.module.scss";

function MySelect<Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>>(props: Props<Option, IsMulti, Group>) {

    const theme = todos.theme === 'dark' ? myTheme.dark : myTheme.light
    const currentTheme = todos.theme === 'dark' ? darkTheme : lightTheme

    const customStyles = {
        option: (provided: any, state: any) => {
            return {
                ...provided,
                backgroundColor: state.isSelected ? theme.activeColor : theme.bgColor,
            }
        },
        control: () => ({
            width: 200,
        }),
    }
    return <Select {...props} styles={customStyles} defaultValue={props.defaultValue}
                   className={currentTheme.fontColor}/>
}

export default MySelect;