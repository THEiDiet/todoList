import React from 'react';
import Select, {ActionMeta, GroupBase, OnChangeValue, Props, SingleValue} from "react-select";
import todos from "../../store/todo";
import myTheme from './theme'
import StateManagedSelect from "react-select/dist/declarations/src/stateManager";

// type propsType = typeof Select

function MySelect<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
    >(props: Props<Option, IsMulti, Group>) {

    const theme = todos.theme === 'dark' ? myTheme.dark : myTheme.light

    const customStyles = {
        option: (provided: any, state: any) => {
            return {
                ...provided,
                backgroundColor: state.isSelected ? theme.activeColor : theme.bgColor,
                color: state.isSelected ? theme.activeColor: theme.color,
            }
        },
        control: () => ({

            width: 200,
        }),
        singleValue: (provided: any, state: any) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return {...provided, opacity, transition};
        }
    }

    const handler=(newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) =>{
    }
    return (
        <>
            <Select {...props} styles={customStyles}   />
        </>
    );
};

export default MySelect;