import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";

const TaskList = ({tasks, addToCompletedTasks, completedTasks, handleDelete, handleSave, setTasks}) => {

  const [editIndex, setEditIndex] = useState(null)
  const [editText, setEditText] = useState("")

  const handleChecked = (index) => {
    if(editIndex === null) {
      const updatedTask = {...tasks[index], isChecked: true}
      addToCompletedTasks(updatedTask);
      setTasks(tasks.filter((_, i) => i !== index));
    }
  }

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text)
  }
  
  const handleEditSave = (id) => {
    handleSave(id, editText)
    setEditIndex(null)
  }

  return (
    <div className="w-full mt-2 sm:mt-4 bg-base-300/50 rounded-xl">
      <ul className="flex flex-col">
        {tasks.map((task, index) => (
          <li 
            className={`flex items-center justify-between py-3 sm:px-5 px-2 hover:bg-base-300 cursor-pointer ${index != tasks.length - 1 ? "border-b border-white/5": ''} `}
            key={index}
          >
            <div
              className="flex items-center gap-3 sm:gap-7 w-full"
            >
                <input 
                  type="checkbox" 
                  className="size-4" 
                  checked={task.isChecked}
                  onChange={() => handleChecked(index)}
                />
              {editIndex === index ? 
                <input 
                  type="text" 
                  className="border-none outline-none bg-base-300 rounded-lg w-full text-lg"
                  value={editText}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                />
                :
                <p className="text-white/60"
                  onClick={() => handleChecked(index)}>
                  {task.text}
                </p> 
              }
            </div>
            <div className="flex items-center gap-2">
              {editIndex === index ?
                <button onClick={() => handleEditSave(task.id)}>
                  <div className="bg-primary rounded-xl cursor-pointer text-sm sm:text-md px-3 py-1 text-green-950 font-semibold">
                    save
                  </div>
                </button>  :

                <button onClick={() => handleEdit(index)}>
                  <div className="bg-secondary/10 rounded-lg sm:rounded-xl cursor-pointer  p-2">
                    <Pencil className="text-secondary size-4 sm:size-5" />
                  </div>
                </button>
              }
              <button onClick={() => handleDelete(task.id, task)}>
                <div className="bg-orange-500/8 rounded-lg sm:rounded-xl cursor-pointer p-2">
                  <Trash2 className="text-orange-200 size-4 sm:size-5" />
                </div>
              </button>
            </div>
          </li>
        ))}
        {completedTasks.map((task, index) => (
          <li 
            className={`flex items-center justify-between py-3 px-5 bg-base-100/70 cursor-pointer ${index != completedTasks.length - 1 ? "border-b border-white/5": ''} `}
            key={index}
          >
            <div
              className="flex items-center gap-7 w-full"
            >
              <input 
                type="checkbox" 
                className="size-4" 
                checked={true}
                disabled
              />
              <p className="text-white/30 line-through">
                {task.text}
              </p>
            </div>
            <button onClick={() => handleDelete(task.id, task)}>
              <div className="bg-orange-500/8 rounded-lg sm:rounded-xl cursor-pointer  p-2">
                <Trash2 className="text-orange-200 size-4 sm:size-5" />
              </div>
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
};

export default TaskList;
