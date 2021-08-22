<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import { provide } from "vue";
import { useTodo, TodoContext } from "./compositions/useTodo";
provide(TodoContext, useTodo());
</script>

<style></style>
