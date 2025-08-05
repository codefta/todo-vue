import { ref } from 'vue'
import { defineStore } from 'pinia'

export type TodoType = 'urgent' | 'high' | 'medium' | 'normal'

export interface Todo {
  id: number
  text: string
  priority: TodoType
  completed: boolean
}

export interface NewTodo {
  text: string
  priority: TodoType
}

export interface UpdateTodo {
  text?: string
  priority?: TodoType
}

export const useTodoStore = defineStore(
  'todo',
  () => {
    const todos = ref<Todo[]>([])

    const addTodo = ({ text, priority }: NewTodo) => {
      todos.value.push({
        id: Math.random() * Math.max(999999),
        text: text,
        priority: priority,
        completed: false,
      })
    }

    const updateTodo = ({ id, updateTodo }: { id: number; updateTodo: UpdateTodo }) => {
      const existingTodo = todos.value.find((todo) => todo.id === id)
      if (!existingTodo) {
        // TODO: return error
        return
      }

      let updateTodoPayload = {
        ...existingTodo,
      }

      if (updateTodo.text) {
        updateTodoPayload = {
          ...updateTodoPayload,
          text: updateTodo.text,
        }
      }

      if (updateTodo.priority) {
        updateTodoPayload = {
          ...updateTodoPayload,
          priority: updateTodo.priority,
        }
      }

      todos.value = todos.value.map((todo) => (todo.id === id ? updateTodoPayload : todo))
    }

    const completeTodo = (id: number) => {
      const existingTodo = todos.value.find((todo) => todo.id === id)
      if (!existingTodo) {
        return
      }

      todos.value = todos.value.map((todo) =>
        todo.id === id
          ? {
              ...existingTodo,
              completed: true,
            }
          : todo,
      )
    }

    const deleteTodo = (id: number) => {
      const existingTodo = todos.value.find((todo) => todo.id === id)
      if (!existingTodo) {
        // TODO: return error
        return
      }

      todos.value = todos.value.filter((todo) => todo.id !== id)
    }

    const findTodo = (id: number) => {
      const existingTodo = todos.value.find((todo) => todo.id === id)
      if (!existingTodo) {
        // TODO: return error
        return
      }

      return existingTodo
    }

    return { todos, addTodo, updateTodo, deleteTodo, findTodo, completeTodo }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['todos'],
    },
  },
)
