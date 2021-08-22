<template>
  <div>
    {{ todos }}
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <label>
          <input
            type="checkbox"
            :checked="todo.status === 'DONE'"
            @click="toggle(todo)"
          />
          <span v-text="todo.text"></span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Todos } from "@/domain/todo";
import { inject } from "vue";
import { TodoContext } from "@/compositions/useTodo";
const todo = inject(TodoContext);
if (!todo) throw new Error("Todo is not injected");
const { todos, toggle } = todo;
</script>

<style lang="scss" scoped></style>
