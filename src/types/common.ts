

export type PointType = {
    id: string
    text: string
    expire: string
    isDone:boolean
}
export type TaskType = {
    id: string
    // points: PointType[]
    selectColor: selectColorsType
    text: string
    expire: string
    isDone:boolean
}
export type TodoType = {
    filters:string[]
    id: string
    category: string
    created: string
    tasks: TaskType[]
    title: string
}
export type TaskSettingsType = {
    todoId: string|null
    taskId:string|null
}
export type commonButtonPropsType = {
    text:string
    cb:()=>void
    mode?: 'border' | 'fulfilled' | 'none'
}
export type FiltersType = 'important'& 'not important'& 'urgently'& 'not urgently' & 'all'

export type PointsType = { [key:string]: PointType[] }
export type selectColorsType = colorsKeys | 'inherit'
export type colorsKeys = "red" | "aqua" | "green" | "blue" | "violet"