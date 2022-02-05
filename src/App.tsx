import React from 'react';
import s from './styles/App.module.scss';
import c from './styles/common.module.scss'
import Todo from "./components/Todo";
import {observer} from "mobx-react-lite";
import todo from './store/todo'
import Filters from "./components/Filters";
import FilteredTodos from "./components/FilteredTodos";
import Categories from "./components/common/Categories";
import TaskSettings from "./components/common/TaskSettings";
import darkTheme from './styles/DarkTheme.module.scss'
import AddTodoForm from "./components/AddTodoForm";
import lightTheme from "./styles/LightTheme.module.scss";
import Modal from "./components/common/Modal";
import {ReactComponent as SunIcon} from "./assets/sun.svg";
import {ReactComponent as MoonIcon} from "./assets/moon.svg";
import MyButton from "./components/common/MyButton";

const App = observer(() => {
    const currentTheme = todo.theme === 'dark' ? darkTheme : lightTheme

    const addNewTodo = (todoTitle: string) => {
        todo.addTodoList(todoTitle)
    }
    const todoItem = todo.todos.find(t => t.id === todo.currentTodo)

    const filteredTodosWithCategory = todo.currentCategory ? todo.todos.filter(t => t.category === todo.currentCategory) : todo.todos
    const filteredWithFilter = todo.currentFilter ? filteredTodosWithCategory.filter(t => t.filters.some(s => s === todo.currentFilter)) : filteredTodosWithCategory


    return (
        <div className={`${s.app} ${currentTheme.bgColor} ${currentTheme.fontColor} `}>
            {todo.isModalOpen && todo.currentTaskBody && <Modal task={todo.currentTaskBody}/>}
            <div className={s.container}>
                <div className={s.top}>
                    <Categories/>
                </div>
                <div className={`${s.left} ${currentTheme.bgElemDark}`}>
                    <h3>Filters</h3>
                    <Filters callback={(f)=>todo.setFilter(f)}/>
                    {todo.currentTaskBody && <TaskSettings taskItem={todo.currentTaskBody}/>}
                </div>
                <div className={s.center}>
                    <div className={s.themeHandler} onClick={() => todo.changeTheme(todo.theme)}>
                        {todo.theme === 'light' ? <SunIcon className={currentTheme.activeFillColor}/> :
                            <MoonIcon className={currentTheme.activeFillColor}/>}
                    </div>

                    {!todo.currentTodo && <AddTodoForm callback={addNewTodo}/>}
                    {todo.currentTodo && todoItem && !todo.isModalOpen && <div className={s.todoContainer}>
                        <Todo todo={todoItem} title={todoItem.title} key={todoItem.id}/>
                        <MyButton callback={() => todo.chooseTodo(null)} mode={'add'}/>
                        <button className={`${c.button} ${s.addToLS} ${currentTheme.borderColor}`}
                                onClick={() => todo.saveToLocalStorage()}>Add to Local Storage
                        </button>
                        <button className={`${c.button} ${s.getFromLS} ${currentTheme.borderColor}`}
                                onClick={() => todo.getFromLocalStorage()}>Get From Local Storage
                        </button>

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
