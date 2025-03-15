import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";

const loadState = () => {
  try {
    const prevState = localStorage.getItem("todos");
    return prevState ? JSON.parse(prevState) : [];
  } catch (error) {
    console.error("Error loading state:", error);
    return [];
  }
};

const saveState = (state) => {
  try {
    const prevState = JSON.stringify(state);
    localStorage.setItem("todos", prevState);
  } catch (error) {
    console.error("Error saving state:", error);
  }
};

const preloadedState = {
  todos: loadState(), 
};

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState, 
});

store.subscribe(() => {
  saveState(store.getState().todos);
});

export default store;
