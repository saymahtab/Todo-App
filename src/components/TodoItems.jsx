import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTodo, EditTodo, Toggle } from "../features/todo/todoSlice";
import { Pencil, Trash2 } from "lucide-react";

const TodoItems = ({ task, taskIndex }) => {
  const [editTodoId, setEditTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  const tasks = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

    const handleEdit = (id) => {
      setEditTodoId(id);
      setEditText(task.title);
    };

    const handleSave = (id) => {
      if (editText.trim()) {
        dispatch(EditTodo({ id, title: editText }));
        setEditTodoId(null);
      }
    };
    const handleCheckbox = (id) => {
      dispatch(Toggle(id));
    };

  return (
    <li
      key={task.id}
      className={`flex items-center justify-between py-3 sm:px-5 px-2 hover:bg-base-300 cursor-pointer ${
        taskIndex != tasks.length - 1 ? "border-b border-white/5" : ""
      } `}
    >
      <div className="flex items-center gap-3 sm:gap-7 w-full min-w-0">
        <input
          type="checkbox"
          className="w-4 h-4 min-w-[16px] min-h-[16px]"
          checked={task.isChecked}
          onChange={() => {
            handleCheckbox(task.id);
          }}
        />
        {editTodoId === task.id ? (
          <input
            type="text"
            className="border-none outline-none bg-base-300 rounded-lg w-full text-lg"
            value={editText}
            autoFocus
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : !task.isChecked ? (
          <p
            onClick={() => handleCheckbox(task.id)}
            className="text-white/60 truncate whitespace-nowrap overflow-ellipsis"
          >
            {task.title}
          </p>
        ) : (
          <p
            onClick={() => handleCheckbox(task.id)}
            className="text-white/30 line-through truncate whitespace-nowrap overflow-hidden"
          >
            {task.title}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {!task.isChecked && (
          <span className="text-[10px] text-white/40 hidden sm:block">
            {new Date(task.time).toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        )}
        {editTodoId === task.id ? (
          <button onClick={() => handleSave(task.id)}>
            <div className="bg-primary rounded-xl cursor-pointer text-sm sm:text-md px-3 py-1 text-green-950 font-semibold">
              save
            </div>
          </button>
        ) : (
          !task.isChecked && (
            <button onClick={() => handleEdit(task.id)}>
              <div className="bg-secondary/10 rounded-lg sm:rounded-xl cursor-pointer  p-2">
                <Pencil className="text-secondary size-4 sm:size-5" />
              </div>
            </button>
          )
        )}
        <button onClick={() => dispatch(DeleteTodo(task.id))}>
          <div className="bg-orange-500/8 rounded-lg sm:rounded-xl cursor-pointer p-2">
            <Trash2 className="text-orange-200 size-4 sm:size-5" />
          </div>
        </button>
      </div>
    </li>
  );
};

export default TodoItems;
