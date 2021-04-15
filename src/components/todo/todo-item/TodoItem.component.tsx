import { FC } from "react";

import { useRecoilState } from "recoil";
import { todoListState } from "../../../state/atoms";
import { TodoItem } from "../../../models";
import { removeItemAtIndex, replaceItemAtIndex } from "../util";

interface TodoItemViewProps {
  item: TodoItem;
}

const TodoItemView: FC<TodoItemViewProps> = ({ item }) => {
  // this weill give us both the value and the setter function of the atom/state
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const index = todoList.findIndex(listItem => listItem === item);

  console.log(index);

  const editItemText = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });
    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input type="checkbox" checked={item.isComplete} onChange={toggleItemCompletion} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

export default TodoItemView;
