export type PointType = {
    id: string
    text: string
    expire: string
    isDone:boolean
}
export type TaskType = {
    id: string
    // points: PointType[]
    selectColor: string
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

export type PointsType = { [key:string]: PointType[] }
