import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue";
import App from "./App.vue";
import TodoList from "./components/TodoList/index.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: TodoList }],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
