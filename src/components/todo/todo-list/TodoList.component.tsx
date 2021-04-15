import { FC } from "react";
import { useRecoilValue } from "recoil";

import TodoItemView from "../todo-item/TodoItem.component";
import TodoInput from "../todo-input/TodoInput.component";
import TodoListStats from "../todo-list-stats/TodoListStats.component";
import TodoListFilters from "../todo-list-filters/TodoListFilters.component";

import { filteredTodoListState } from "../../../state/selectors";

const TodoList: FC = () => {
  // to only use the atom/state value without the set function
  const todoList = useRecoilValue(filteredTodoListState);

  console.log(todoList);

  return (
    <div style={{ backgroundColor: "pink" }}>
      <TodoListStats />
      <TodoListFilters />
      <TodoInput />
      {todoList.map(todoItem => (
        <TodoItemView key={todoItem.id} item={todoItem} />
      ))}
    </div>
  );
};
export default TodoList;
