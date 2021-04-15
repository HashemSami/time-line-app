import { TodoItem } from "../../models";

// utility for creating unique Id
let id = 0;
export const getId = () => {
  return id++;
};

export const replaceItemAtIndex = (arr: TodoItem[], index: number, newValue: TodoItem) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const removeItemAtIndex = (arr: TodoItem[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};
