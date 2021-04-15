import { atom } from "recoil";
import { TodoItem } from "../../models";

type FilterTodoState = "Show All" | "Show Completed" | "Show Uncompleted";

export const todoListState = atom<TodoItem[]>({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = atom<FilterTodoState>({
  key: "todoListFilterState",
  default: "Show All",
});
