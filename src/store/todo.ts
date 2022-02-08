import {makeAutoObservable} from "mobx";
import {FiltersType, PointsType, selectColorsType, TaskSettingsType, TaskType, TodoType} from "../types/common";
import {v1} from 'uuid'


class Todo {
    todos: TodoType[] = [
        {
            filters: ['all', 'urgently'] as FiltersType[],
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
    filters = ['important', 'not important', 'urgently', 'not urgently'] as FiltersType[]
    currentFilter = ['all'] as FiltersType[]
    currentTodo = '1' as null | string
    categories = ['home', 'work', 'hobbies', 'dreams', 'plans']
    currentCategory = null as null | string
    currentTask = {todoId: null, taskId: null} as TaskSettingsType
    theme = 'light' as 'dark' | 'light'
    isModalOpen = false

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

    setIsModalOpen() {
        this.isModalOpen = !this.isModalOpen
    }

    addTodoList(title: string) {
        const newTodo = {
            filters: ['all'] as FiltersType[],
            title,
            id: v1(),
            category: '',
            created: Date.now().toString(),
            tasks: [],
        }
        this.todos.push(newTodo)
        this.currentTodo = newTodo.id
    }

    editTodoListTitle(todoId: string, title: string) {
        this.todos = this.todos.map(t => t.id === todoId ? {...t, title} : t)
    }

    deleteTodoList(todoId: string) {
        this.todos = this.todos.filter(t => t.id !== todoId)
        this.currentTodo = null
    }

    addTodoFilter(todoId: string, filter: FiltersType) {
        this.todos.forEach(t => {
            if (t.id === todoId) {
                if (t.filters.indexOf(filter) === -1) {
                    if (filter === 'important' && t.filters.indexOf('not important') !== -1) {
                        t.filters.splice(t.filters.indexOf('not important'), 1)
                    } else if (filter === 'not important' && t.filters.indexOf('important') !== -1) {
                        t.filters.splice(t.filters.indexOf('important'), 1)
                    } else if (filter === 'not urgently' && t.filters.indexOf('urgently') !== -1) {
                        t.filters.splice(t.filters.indexOf('urgently'), 1)
                    } else if (filter === 'urgently' && t.filters.indexOf('not urgently') !== -1) {
                        t.filters.splice(t.filters.indexOf('not urgently'), 1)
                    }
                    t.filters.push(filter)
                } else {
                    t.filters.splice(t.filters.indexOf(filter), 1)
                }

            }
        })
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
        this.points[taskId] = this.points[taskId].map(p => ( {...p, isDone: !prevIsDone}))
    }

    editTaskText(todoId: string, taskId: string, newText: string) {
        let todo = this.todos.findIndex(t => t.id === todoId)
        this.todos[todo].tasks = this.todos[todo]?.tasks.map(t => t.id === taskId ? {...t, text: newText} : t)
    }

    changeAllTask(task: TaskType) {

        const {todoId, taskId} = this.currentTask
        let todo = this.todos.findIndex(t => t.id === todoId)
        this.todos[todo].tasks = this.todos[todo]?.tasks.map(t => t.id === taskId ? {...t, ...task} : t)
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

    setFilter(filter: FiltersType) {
        const index = this.currentFilter.indexOf(filter)
        if (index === -1) {
            if (filter === 'important' && this.currentFilter.indexOf('not important') !== -1) {
                this.currentFilter.splice(this.currentFilter.indexOf('not important'), 1)
            } else if (filter === 'not important' && this.currentFilter.indexOf('important') !== -1) {
                this.currentFilter.splice(this.currentFilter.indexOf('important'), 1)
            } else if (filter === 'not urgently' && this.currentFilter.indexOf('urgently') !== -1) {
                this.currentFilter.splice(this.currentFilter.indexOf('urgently'), 1)
            } else if (filter === 'urgently' && this.currentFilter.indexOf('not urgently') !== -1) {
                this.currentFilter.splice(this.currentFilter.indexOf('not urgently'), 1)
            }
            this.currentFilter.push(filter)
        } else {
            this.currentFilter.splice(index, 1)
        }
    }

    clearFilters() {
        this.currentFilter = ['all']
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

    setCurrentTask(payload: TaskSettingsType) {
        this.currentTask = payload
    }

    get currentTaskBody() {
        const {todoId, taskId} = this.currentTask
        return this.todos.find(t => t.id === todoId)?.tasks.find(t => t.id === taskId)
    }
}


export default new Todo()