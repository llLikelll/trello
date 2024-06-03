import {ref, watch} from 'vue'
import type {Ref} from 'vue'
import { defineStore } from 'pinia'

export const useListsStore = defineStore('lists', () => {
    const lists: Ref<AppList[]> = ref([])
    const listsInStorage = localStorage.getItem('lists')
    if (listsInStorage) {
        lists.value = JSON.parse(listsInStorage)
    }

    watch(
        () => lists.value,
        (state) => {
            localStorage.setItem('lists', JSON.stringify(state))
        },
        {
            deep: true,
        }
    )

    function getList(listId: number) {
        return lists.value.find((item) => item.id === listId)
    }

    function add(name: string) {
        lists.value.push({
            id: lists.value.length,
            name: name || `Новый список ${lists.value.length + 1}`,
            tasks: [],
        })
    }

    function remove(listId: number) {
        lists.value = lists.value.filter((item) => item.id !== listId)
    }

    function clear() {
        lists.value = []
    }

    function addTask(listId: number, text: string) {
        const selectedList =  getList(listId)
        if (selectedList && text) {
            selectedList.tasks.push({
                id: selectedList.tasks.length,
                text: text
            })
            return true
        } else {
            return false
        }
    }

    function removeTask(listId: number, taskId: number) {
        const selectedList =  getList(listId)
        if (selectedList) {
            selectedList.tasks = selectedList.tasks.filter((item) => item.id !== taskId)
        }
    }

    return { lists, add, remove, clear, addTask, removeTask }
})