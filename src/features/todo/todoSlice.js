import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  console.log(response.data)
  return response.data;
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
        title: action.payload,
        time: Date.now(),
        id: uuid(),
        isChecked: false,
      });
    },
    DeleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    EditTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
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
        (state.isLoading = false), (state.todos = action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => [
        console.log("Error is Fetching Todos: ", action.error),
        (state.isError = true),
      ]);
  },
});

export const { AddTodo, DeleteTodo, EditTodo, Toggle } = todoSlice.actions;

export default todoSlice.reducer;
