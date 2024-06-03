/// <reference types="vite/client" />

type AppTask = {
    id: number
    text: string
}

type AppList = {
    id: number
    name: string
    tasks: AppTask[]
}