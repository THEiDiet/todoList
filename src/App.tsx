import React, {useState} from 'react';
import s from './styles/App.module.scss';
import Todo from "./components/Todo";
import {observer} from "mobx-react-lite";
import todo from './store/todo'
import Filters from "./components/Filters";
import FilteredTodos from "./components/FilteredTodos";
import MyInput from "./components/common/MyInput";
import Categories from "./components/common/Categories";
import TaskSettings from "./components/common/TaskSettings";
import {TaskType} from "./types/common";


export type TaskSettingsType = {
    todoId:string
    task:TaskType
}
const App = observer(() => {
    const [todoTitle,setTodoTitle] = useState('')
    const addNewTodo = ()=>{
        todo.addTodoList(todoTitle)
    }
    const todoItem = todo.todos.find(t => t.id === todo.currentTodo)

    const filteredTodosWithCategory = todo.currentCategory ? todo.todos.filter(t => t.category === todo.currentCategory) : todo.todos
    const filteredWithFilter = todo.currentFilter ? filteredTodosWithCategory.filter(t => t.filters.some(s => s === todo.currentFilter)) : filteredTodosWithCategory

    const [currentTask,setCurrentTask] = useState<null | TaskSettingsType>(null)
    const setCurrentTaskHandler = (todoId:string,task:TaskType) => {
        setCurrentTask({todoId,task})
    }

    return (
        <div className={s.app}>
            <div className={s.container}>
                <div className={s.top}>
                    <Categories/>
                </div>
                <div className={s.left}>
                    <Filters/>
                    {currentTask && <TaskSettings task={currentTask.task} todoId={currentTask.todoId}/>}
                </div>
                <div className={s.center}>
                    {!todo.currentTodo && <MyInput setText={setTodoTitle} text={todoTitle} onClickHandler={addNewTodo}/>}
                    {todo.currentTodo && todoItem && <div className={s.todoContainer}>
                         <Todo todo={todoItem} title={todoItem.title} key={todoItem.id} setCurrentTask={setCurrentTaskHandler}/>
                        <button className={s.addNewTodo} onClick={()=>todo.chooseTodo(null)}>Add new TodoList</button>
                        <button className={s.addToLS} onClick={()=>todo.saveToLocalStorage()}>Add to Local Storage</button>
                        <button className={s.getFromLS} onClick={()=>todo.getFromLocalStorage()}>Get From Local Storage</button>
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
