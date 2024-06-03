<template>
  <main>
    <div class="d-flex align-items-center justify-content-between">
      <div class="list-creator">
        <div>Новый список</div>
        <input v-model="listName" type="text" placeholder="Название списка"/>
        <button @click.prevent="createList()">Создать список</button>
      </div>
      <div>
        <button @click.prevent="clearLists()">Очистить доску</button>
      </div>
    </div>
    <draggable class="lists" :list="lists" item-key="id" handle=".drag-area">
      <template #item="{element: list}">
        <div class="list-item">
          <div class="mb-8">
            <div class="d-flex align-items-center gap-8">
              <div class="drag-area">
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"/></svg>
              </div>
              <label-edit v-model="list.name"/>
              <button type="button" class="close ms-auto" @click.prevent="removeList(list.id)">&times;</button>
            </div>
          </div>
          <draggable class="tasks mb-8" :list="list.tasks" group="tasks" handle=".drag-area" item-key="id">
            <template #item="{element: task}">
              <div class="task-item">
                <div class="d-flex justify-content-between mb-8">
                  <div class="drag-area">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"/></svg>
                  </div>
                  <button type="button" class="close" @click.prevent="removeTask(list.id, task.id)">&times;</button>
                </div>
                <textarea class="w-100" v-model="task.text"/>
              </div>
            </template>
          </draggable>
          <button class="mt-auto" @click.prevent="openTaskModal(list.id)">Добавить задачу</button>
        </div>
      </template>
    </draggable>

    <app-modal v-model="taskCreateModalVisible" title="Создать задачу">
      <template #body>
        <div class="mb-8">
          <textarea v-model="taskText"/>
        </div>
        <button @click.prevent="addTaskToList()">Создать задачу</button>
      </template>
    </app-modal>
  </main>
</template>

<script setup lang="ts">
import {computed, type ComputedRef, ref} from "vue";
import AppModal from "@/components/AppModal.vue";
import LabelEdit from "@/components/LabelEdit.vue";
import {useListsStore} from "@/stores/lists";
import draggable from 'vuedraggable'

const listsStore = useListsStore()

const listName = ref('')
const lists: ComputedRef<AppList[]> = computed(() => listsStore.lists)

const selectedListId = ref(-1)
const taskCreateModalVisible = ref(false)
const taskText = ref('')

function createList() {
  listsStore.add(listName.value)
  listName.value = ''
}

function removeList(listId: number) {
  listsStore.remove(listId)
}

function clearLists() {
  listsStore.clear()
}

function openTaskModal(listId: number) {
  taskCreateModalVisible.value = true
  selectedListId.value = listId
}

function addTaskToList() {
  if (listsStore.addTask(selectedListId.value, taskText.value)) {
    taskCreateModalVisible.value = false
    selectedListId.value = -1
    taskText.value = ''
  } else {
    alert('Ошибка создания задачи')
  }
}

function removeTask(listId: number, taskId: number) {
  listsStore.removeTask(listId, taskId)
}
</script>

<style scoped>
.list-creator {
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.w-100 {
  width: 100%;
}

.ms-auto {
  margin-left: auto;
}

.lists {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.list-item {
  border: 1px solid #000;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}

.d-flex {
  display: flex;
}

.justify-content-between {
  justify-content: space-between;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 100px;
}

.task-item {
  background-color: #f8f8f8;
  padding: 0.5rem;
}

.mt-8 {
  margin-top: 0.5rem;
}

.mt-auto {
  margin-top: auto;
}

.mb-8 {
  margin-bottom: 0.5rem;
}

.gap-8 {
  gap: 0.5rem;
}

.align-items-center {
  align-items: center;
}

.drag-area {
  line-height: 1;

  color: #eee;
  cursor: grab;

  .sortable-chosen & {
    cursor: grabbing;
  }
}

@media screen and (max-width: 992px) {
  .lists {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 767px) {
  .lists {
    grid-template-columns: repeat(2, 1fr);
    min-width: 500px;
  }

  main {
    padding-top: 1rem;
    padding-bottom: 1rem;
    overflow: auto;
  }
}
</style>
