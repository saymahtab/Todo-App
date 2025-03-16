import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";

const loadTodosFromLocalStorage = () => {
  try {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error("Error parsing todos from localStorage:", error);
    return [];
  }
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const preloadedState = {
  todo: {
    todos: loadTodosFromLocalStorage(),
    isLoading: false,
    isError: false,
  },
};

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveTodosToLocalStorage(store.getState().todo.todos);
});

export default store;
