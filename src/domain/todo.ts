import { fromNullable, fold, none, Option, map } from "fp-ts/lib/Option";
import { IOEither } from "fp-ts/lib/IOEither";
import { Either, right, left, chain } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { foldMap } from "fp-ts/lib/Either";

export type TodoStatus = "DONE" | "DOING" | "TODO";

export type Todo = {
  status: TodoStatus;
  text: string;
  description: Option<string>;
  id: string;
};

export type DraftTodo = Pick<Todo, "text">;

export type Todos = Todo[];

export type EditTodo = (
  todo: Todo,
  query: Partial<Pick<Todo, "text" | "description" | "status">>
) => Either<string, Todo>;

export type FindTodo = (id: string) => (todos: Todos) => Option<Todo>;

export type UpdateTodo = (
  todos: Todos
) => (todo: Todo) => Either<string, Todos>;

export type UpdateStatus = (
  status: TodoStatus,
  todos: Todos
) => (id: string) => Either<string, Todos>;

export type CreateTodo = (draft: DraftTodo) => Either<string, Todo>;

export type SaveTodo = (todos: Todos) => IOEither<string, void>;

export type LoadTodo = () => IOEither<string, Todos>;

export const updateTodo: UpdateTodo = (todos) => (todo) =>
  pipe(
    todos,
    findTodo(todo.id),
    fold(
      () => left(`todo ${todo.id} is not found`),
      () => right(todos.map((x) => (x.id === todo.id ? todo : x)))
    )
  );

export const createTodo: CreateTodo = (draft) =>
  right({
    ...draft,
    status: "TODO",
    description: none,
    id: pipe(Math.random() * 10000, Math.round, (a) => a.toString()),
  });

export const findTodo: FindTodo = (i) => (todos) =>
  pipe(
    todos.find(({ id }) => id === i),
    fromNullable
  );

export const editTodo: EditTodo = (todo, query) => right({ ...todo, ...query });

export const updateStatus: UpdateStatus = (status, todos) => (id) =>
  pipe(
    todos,
    findTodo(id),
    fold(
      () => left(`todo ${id} is not found.`),
      (a) => editTodo(a, { status })
    ),
    chain(updateTodo(todos))
  );
