import { FC } from "react";

import { useRecoilState } from "recoil";
import { todoListFilterState } from "../../../state/atoms";

type FilterTodoState = "Show All" | "Show Completed" | "Show Uncompleted";

const TodoListFilters: FC = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);
  const updateFilter = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    if (value === "Show All" || value === "Show Completed" || value === "Show Uncompleted") {
      console.log(value);
      setFilter(value);
    }
    console.log(filter);
  };
  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
};

export default TodoListFilters;
