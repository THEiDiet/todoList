import {makeAutoObservable} from "mobx";
import {PointsType, PointType, selectColorsType, TaskSettingsType, TaskType, TodoType} from "../types/common";
import {v1} from 'uuid'


class Todo {
    todos: TodoType[] = [
        {
            filters: ['all', 'tomorrow'],
            title: 'first todo',
            id: '1',
            category: 'daily',
            created: Date.now().toString(),
            tasks: [
                {
                    id: 'task1',
                    isDone: false,
                    expire: '2022-02-02',
                    selectColor: 'green' as selectColorsType,
                    text: 'some task'
                },
                {
                    id: 'task2',
                    isDone: false,
                    expire: '2022-02-02',
                    selectColor: 'violet' as selectColorsType,
                    text: 'some another very important task'
                },
            ],
        }
    ]
    points: PointsType = {
        'task1': [
            {
                id: '112',
                text: 'explanation',
                expire: '2022-02-02',
                isDone: false
            },
            {
                id: '12',
                text: 'explanation',
                expire: '2022-02-02',
                isDone: false
            }
        ],
        task2: []
    }
    filters = ['all', 'tomorrow', 'someday', 'urgently']
    currentFilter: string = 'all'
    currentTodo = '1' as null | string
    categories = ['daily', 'weekly', 'yearly', 'dreams', 'plans']
    currentCategory = null as null | string
    currentTask = {todoId:null,taskId:null} as TaskSettingsType
    // selectColors = ['#CDBBE4','#DAB2D6','#BEC2E3','#B0D5C8','#B6D9DE',]
    theme = 'light' as 'dark' | 'light'
    isModalOpen = false as boolean
    constructor() {
        makeAutoObservable(this)
    }

    changeTheme(prevTheme: 'dark' | 'light') {
        this.theme = prevTheme === 'dark' ? 'light' : "dark"
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
        localStorage.setItem('points', JSON.stringify(this.points))
    }

    getFromLocalStorage() {
        let todos = localStorage.getItem('todos')
        if (todos) this.todos = JSON.parse(todos)
        let points = localStorage.getItem('points')
        if (points) this.points = JSON.parse(points)
    }
    setIsModalOpen(){
       this.isModalOpen= !this.isModalOpen
    }
    addTodoList(title: string) {
        const newTodo = {
            filters: ['all',],
            title,
            id: v1(),
            category: 'daily',
            created: Date.now().toString(),
            tasks: [],
        }
        this.todos.push(newTodo)
        this.currentTodo = newTodo.id
    }

    addTodoFilter(todoId: string, filter: string) {
        this.todos.forEach(t => t.id === todoId ? t.filters.push(filter) : t)
    }
    deleteTodoFilter(todoId: string, filter: string) {
        let i = this.todos.findIndex(t => t.id === todoId)
        this.todos[i].filters = this.todos[i].filters.filter(f => f !== filter)
    }

    addNewTask(todoId: string, newText: string) {
        let taskId = v1()
        let newTask = {
            id: taskId,
            isDone: false,
            expire: 'tomorrow',
            selectColor: 'inherit' as selectColorsType,
            text: newText
        }
        let todo = this.todos.findIndex(t => t.id === todoId)
        this.todos[todo].tasks = [newTask, ...this.todos[todo].tasks]
        this.points[taskId] = []
    }

    deleteTask(todoId: string, taskId: string) {
        let todo = this.todos.findIndex(t => t.id === todoId)
        this.todos[todo].tasks = this.todos[todo]?.tasks.filter(t => t.id !== taskId)
    }

    toggleTask(todoId: string, taskId: string) {
        let todo = this.todos.findIndex(t => t.id === todoId)
        let prevIsDone = this.todos[todo]?.tasks.find(t => t.id === taskId)?.isDone
        this.todos[todo].tasks = this.todos[todo]?.tasks.map(t => t.id === taskId ? {...t, isDone: !t.isDone} : t)
        this.points[taskId] = this.points[taskId].map(p => p = {...p, isDone: !prevIsDone})
    }

    editTaskText(todoId: string, taskId: string, newText: string) {
        let todo = this.todos.findIndex(t => t.id === todoId)
        this.todos[todo].tasks = this.todos[todo]?.tasks.map(t => t.id === taskId ? {...t, text: newText} : t)
    }
    changeAllTask(task:TaskType){

        const {todoId,taskId}=this.currentTask
        let todo = this.todos.findIndex(t => t.id === todoId)
        this.todos[todo].tasks = this.todos[todo]?.tasks.map(t => t.id === taskId ? {...t, ...task} : t)
    }
    changeTaskSettings(todoId: string, taskId: string, payload: TaskType) {
        let todo = this.todos.findIndex(t => t.id === todoId)
        this.todos[todo].tasks = this.todos[todo]?.tasks.map(t => t.id === taskId ? {...t, ...payload} : t)
    }

    addNewPoint(taskId: string, text: string) {
        let newPoint = {
            id: v1(),
            text: text,
            expire: 'today',
            isDone: false
        }
        this.points[taskId] = [newPoint, ...this.points[taskId]]
    }

    editPointText(taskId: string, pointId: string, newText: string) {
        this.points[taskId] = this.points[taskId].map(p => p.id === pointId ? {...p, text: newText} : p)
    }

    deletePoint(taskId: string, pointId: string) {
        this.points[taskId] = this.points[taskId].filter(p => p.id !== pointId)
    }

    togglePoint(taskId: string, pointId: string) {
        this.points[taskId] = this.points[taskId].map(p => p.id === pointId ? {...p, isDone: !p.isDone} : p)
    }

    setFilter(newFilterValue: string) {
        this.currentFilter = newFilterValue
    }

    chooseTodo(todoId: string | null) {
        this.currentTodo = todoId
    }

    changeCategory(category: string | null) {
        this.currentCategory = category
    }

    changeTodoCategory(todoId: string, category: string) {
        this.todos = this.todos.map(t => t.id === todoId ? {...t, category} : t)
    }
    setCurrentTask(payload:TaskSettingsType){
         this.currentTask = payload
    }
    get currentTaskBody(){
        const {todoId,taskId}=this.currentTask
        return this.todos.find(t => t.id === todoId)?.tasks.find(t => t.id === taskId)

    }
}


export default new Todo()