import React, {useEffect} from 'react';
import s from './styles/App.module.scss';
import Todo from "./components/Todo";
import {observer} from "mobx-react-lite";
import todo from './store/todo'
import FilteredTodos from "./components/FilteredTodos";
import Categories from "./components/common/Categories";
import darkTheme from './styles/DarkTheme.module.scss'
import AddTodoForm from "./components/AddTodoForm";
import lightTheme from "./styles/LightTheme.module.scss";
import Modal from "./components/common/Modal";
import {TodoType} from "./types/common";
import FilterAndSettingsBlock from "./components/common/FilterAndSettingsBlock";
import TaskSettings from "./components/common/TaskSettings";

const App = observer(() => {
    const currentTheme = todo.theme === 'dark' ? darkTheme : lightTheme

    useEffect(()=>{
        todo.getFromLocalStorage()
    },[])

    const addNewTodo = (todoTitle: string) => {
        todo.addTodoList(todoTitle)
    }

    const todoItem = todo.todos.find(t => t.id === todo.currentTodo)
    let filteredWithFilter:TodoType[] = []
    const filteredTodosWithCategory = todo.currentCategory ? todo.todos.filter(t => t.category === todo.currentCategory) : todo.todos
    const filterFunc = ()=>{
        if(todo.currentFilter.length === 1){
            filteredWithFilter = filteredTodosWithCategory
        } else {
            for (let i = 1; i < todo.currentFilter.length; i++) {
                let res = filteredTodosWithCategory.filter(t => t.filters.some(s => s === todo.currentFilter[i]))
                filteredWithFilter.push(...res)
            }
            filteredWithFilter = Array.from(new Set(filteredWithFilter))
        }
    }
    filterFunc()
    return (
        <div className={`${s.app} ${currentTheme.bgColor} ${currentTheme.fontColor} `}>
            {todo.isModalOpen && todo.currentTaskBody && <Modal task={todo.currentTaskBody}/>}
            <div className={s.container}>
                <div className={s.top}>
                    <Categories/>
                </div>
                <div className={`${s.left} ${currentTheme.bgElemDark}`}>
                    <FilterAndSettingsBlock/>
                    {todo.currentTaskBody && <TaskSettings taskItem={todo.currentTaskBody}/>}
                </div>
                <div className={s.center}>
                    {!todo.currentTodo && <AddTodoForm callback={addNewTodo}/>}
                    {todo.currentTodo && todoItem && !todo.isModalOpen && <div className={s.todoContainer}>
                        <Todo todo={todoItem} title={todoItem.title} key={todoItem.id}/>

                    </div>}
                </div>
                <div className={s.right}>
                    <FilteredTodos todos={filteredWithFilter}/>
                </div>
            </div>
        </div>
    )
})

export default App;
