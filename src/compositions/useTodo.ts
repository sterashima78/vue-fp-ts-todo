import { DeepReadonly, InjectionKey, readonly, Ref, ref } from "vue";
import { Todos, createTodo, Todo, updateStatus } from "@/domain/todo";
import { fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
export type UseTodo = {
  todos: DeepReadonly<Ref<Todos>>;
  toggle: (todo: Todo) => void;
};
export const TodoContext: InjectionKey<UseTodo> = Symbol("USeTodo");

export const useTodo = (): UseTodo => {
  const todos: Ref<Todos> = ref([]);
  const updateTodos = (t: Todos) => {
    todos.value = t;
  };
  const add = fold<string, Todo, void>(
    (e) => console.error(e),
    (a) => todos.value.push(a)
  );
  add(createTodo({ text: "task1" }));
  add(createTodo({ text: "task2" }));
  return {
    todos: readonly(todos),
    toggle: (todo: Todo) =>
      pipe(
        todo.id,
        updateStatus(todo.status === "DONE" ? "TODO" : "DONE", todos.value),
        fold((s) => console.error(s), updateTodos)
      ),
  };
};
