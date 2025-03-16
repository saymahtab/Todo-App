import { useDispatch, useSelector } from "react-redux";
import TodoItems from "./TodoItems";
import { fetchTodos } from "../features/todo/todoSlice";
import { useMemo } from "react";

const TodoList = () => {
  const todos = useSelector((state) => state.todo.todos);
  
  const tasks = useMemo(() => {
    return [...todos].sort((a, b) => {
      if (b.isChecked === a.isChecked) {
        return new Date(b.time || 0) - new Date(a.time || 0);
      }
      return a.isChecked ? 1 : -1;
    });
  }, [todos]);
  

  const dispatch = useDispatch();

  const handleFetchTodos = () => {
    dispatch(fetchTodos());
  }

  return (
    <div className="w-full mt-2 sm:mt-4 bg-base-300/50 rounded-xl">
      <ul className="flex flex-col text-right">
        <button
          type="submit"
          onClick={handleFetchTodos}
          className="bg-secondary m-2 w-32 rounded-sm text-black font-semibold py-1 px-3 cursor-pointer mt-3 hover:bg-secondary/90"
        >
          Load Todos
        </button>
        {tasks.map((task, index) => (
          <TodoItems key={task.id} task={task} taskIndex={index} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
