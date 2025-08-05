<script setup lang="ts">
import { ref } from 'vue'

import MainNavbar from '../components/MainNavbar.vue'
import { Pencil, X } from 'lucide-vue-next'
import { useTodoStore, type NewTodo, type TodoType, type UpdateTodo } from '@/stores/todo'
import { computed } from 'vue'

const newTodo = ref<NewTodo>({
  text: '',
  priority: 'medium',
})
const updateTodo = ref<UpdateTodo>({
  text: '',
  priority: 'medium',
})

const showEdit = ref<{
  id: number
  show: boolean
} | null>(null)

const priorities = ref<
  {
    label: string
    value: TodoType
  }[]
>([
  {
    label: 'Urgent',
    value: 'urgent',
  },
  {
    label: 'High',
    value: 'high',
  },
  {
    label: 'Medium',
    value: 'medium',
  },
  {
    label: 'Normal',
    value: 'normal',
  },
])

const todoStore = useTodoStore()

const priorityBgColor = computed((value) =>
  value === 'urgent'
    ? 'bg-red-400'
    : value === 'high'
      ? 'bg-yellow-400'
      : value === 'medium'
        ? 'bg-sky-400'
        : 'bg-gray-400',
)

const handleAddTodo = () => {
  if (!newTodo.value) return

  todoStore.addTodo(newTodo.value)

  newTodo.value = {
    text: '',
    priority: 'medium',
  }
}

const handleUpdateTodo = (id: number) => {
  if (!updateTodo.value) return

  todoStore.updateTodo({ id, updateTodo: updateTodo.value })

  showEdit.value = null
}

const handleDeleteTodo = (id: number) => {
  todoStore.deleteTodo(id)
}

const handleCompleteTodo = (id: number) => {
  todoStore.completeTodo(id)
}

const handleClickUpdateTodo = (id: number) => {
  const updateTodoValue = todoStore.findTodo(id)
  if (!updateTodoValue) return

  showEdit.value = {
    id,
    show: true,
  }

  updateTodo.value.text = updateTodoValue.text
  updateTodo.value.priority = updateTodoValue.priority
}

const handleClickCancelUpdateTodo = () => {
  // TODO: should bind id for next action

  showEdit.value = null
}
</script>

<template>
  <div class="m-auto">
    <MainNavbar active-app="todow" />
    <div class="flex flex-row justify-center w-full gap-4 mt-10">
      <input
        type="text"
        placeholder="What will you do today?"
        v-model="newTodo.text"
        class="ring-1 w-full rounded-md ring-gray-400 p-2"
      />
      <select v-model="newTodo.priority">
        <option v-for="priority in priorities" :key="priority.value" :value="priority.value">
          {{ priority.label }}
        </option>
      </select>
      <button @click="handleAddTodo" class="p-2 rounded-md bg-amber-500 text-white">Create</button>
    </div>
    <div class="mt-10">
      <div v-if="todoStore.todos?.length < 1">
        <div class="text-center">You haven't todo today. please make it first!</div>
      </div>
      <div v-for="todo in todoStore.todos" :key="todo.id">
        <div v-if="showEdit?.id === todo.id">
          <input type="text" v-model="updateTodo.text" />
          <button @click="() => handleUpdateTodo(todo.id)">update</button>
          <button @click="handleClickCancelUpdateTodo">cancel</button>
        </div>
        <div v-else>
          <div class="flex justify-between p-2 bg-amber-50 rounded-lg items-center disabled">
            <div class="flex gap-2">
              <input
                type="checkbox"
                class="w-4 rounded-md"
                :checked="todo.completed"
                @click="() => handleCompleteTodo(todo.id)"
              />
              <div class="">{{ todo.text }}</div>
            </div>
            <div class="flex gap-1">
              <div :class="[priorityBgColor, 'rounded-md px-1 text-white']">
                {{ todo.priority }}
              </div>
            </div>
            <div class="flex gap-2">
              <Pencil
                @click="(event) => handleClickUpdateTodo(todo.id)"
                class="text-amber-500"
                :size="16"
              />
              <X @click="() => handleDeleteTodo(todo.id)" class="text-red-400" :size="16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
