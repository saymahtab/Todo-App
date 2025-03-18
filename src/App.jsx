import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const App = () => {

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex flex-col items-center w-screen sm:mt-8">
        <div className="flex flex-col items-center bg-base-300/50 pt-3 px-1 sm:p-7 w-full max-w-5xl rounded-lg">
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default App;
