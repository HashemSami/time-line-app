import { FC, useState } from "react";

import { getId } from "../util";

import { useSetRecoilState } from "recoil";
import { todoListState } from "../../../state/atoms";

const TodoInput: FC = () => {
  const [inputValue, setInputValue] = useState("");
  //   for setting the value of the atom/state
  //   this will give us only the setter function of the use state hook
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList(oldTodoList => [...oldTodoList, { id: getId(), text: inputValue, isComplete: false }]);
    setInputValue("");
  };

  const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" onChange={onChange} value={inputValue} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default TodoInput;
