import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const storedCompletedTasks = localStorage.getItem("completedTasks");
    return storedCompletedTasks ? JSON.parse(storedCompletedTasks) : [];
  });

  useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
      localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const addTask = (task) => {
    setTasks([
      ...tasks, 
      {
        text: task,
        id: Date.now(),
        isChecked: false,
      },
    ]);
  };

  const handleDelete = (id, task) => {
    if (task.isChecked) {
      setCompletedTasks(completedTasks.filter(tsk => tsk.id !== id));
    } else {
      setTasks(tasks.filter(tsk => tsk.id !== id));
    }
  };

  const handleSave = (id, newText) => {
    setTasks(tasks.map(tsk => tsk.id === id ? {...tsk, text: newText} : tsk));
  };

  const addToCompletedTasks = (task) => {
    setCompletedTasks([...completedTasks, task]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex flex-col items-center w-screen sm:mt-8">
        <div className="flex flex-col items-center bg-base-300/50 pt-3 px-1 sm:p-7 w-full max-w-5xl rounded-lg">
          <TaskInput addTask={addTask} />
          <TaskList
            tasks={tasks}
            addToCompletedTasks={addToCompletedTasks}
            completedTasks={completedTasks}
            handleDelete={handleDelete}
            handleSave={handleSave}
            setTasks={setTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
