import { useSelector } from "react-redux";
import TodoItems from "./TodoItems";

const TodoList = () => {
  const tasks = useSelector((state) =>
    [...state.todos].sort((a, b) => {
      if (b.isChecked === a.isChecked) {
        return new Date(b.time) - new Date(a.time); 
      }
      return a.isChecked ? 1 : -1; 
    })
  );

  return (
    <div className="w-full mt-2 sm:mt-4 bg-base-300/50 rounded-xl">
      <ul className="flex flex-col">
        {tasks.map((task, index) => (
          <TodoItems key={task.id} task={task} taskIndex={index} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
