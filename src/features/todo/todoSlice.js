import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return response.data.map((todo) => ({
    id: uuid(),
    title: todo.title,
    isChecked: false,
    time: Date.now(),
  }));
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    AddTodo: (state, action) => {
      state.todos.push({
        id: uuid(),
        title: action.payload,
        isChecked: false,
        time: Date.now(),
      });
    },
    DeleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    EditTodo: (state, action) => {
      const { title, id } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.time = Date.now();
      }
    },
    Toggle: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isChecked = !todo.isChecked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = [
          ...state.todos,
          ...action.payload.map((todo) => ({
            id: todo.id,
            title: todo.title,
            time: Date.now(),
            isChecked: false,
          })),
        ];
      })
      .addCase(fetchTodos.rejected, (state, action) => [
        console.log("Error is Fetching Todos: ", action.error),
        (state.isError = true),
      ]);
  },
});

export const { AddTodo, DeleteTodo, EditTodo, Toggle } = todoSlice.actions;

export default todoSlice.reducer;
