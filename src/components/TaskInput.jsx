import { CheckCheck } from "lucide-react";
import { useState } from "react";

const TaskInput = ({ addTask }) => {

    const [task, setTask] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if(task.trim()) addTask(task)
        setTask('');
    }

  return (
    <div className="w-full border-b border-white/10 pb-4">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="border-r border-base-300 pr-2 absolute top-5 sm:top-4 left-3 sm:left-4">
            <CheckCheck className="text-primary size-6 sm:size-7" />
          </div>
          <input
            type="text"
            placeholder="What's on your mind?"
            className="pl-12 sm:pl-16 pr-5 py-4 border-none outline-none bg-base-300 rounded-lg w-full text-lg"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
        </div>
        <button 
            type="submit" 
            className="bg-primary w-full rounded-sm text-black font-semibold py-2 px-4 cursor-pointer mt-3 hover:bg-primary/90">
            Add
        </button>
      </form>
      <p className="text-white/30 text-sm mt-2 sm:px-2 flex justify-center sm:justify-start">
        One task at a time, one step closer to success!
      </p>
    </div>
  );
};

export default TaskInput;
