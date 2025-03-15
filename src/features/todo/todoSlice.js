import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    AddTodo: (state, action) => {
      return [
        ...state,
        {
          text: action.payload,
          time: Date.now(),
          id: uuid(),
          isChecked: false,
        },
      ];
    },
    DeleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    EditTodo: (state, action) => {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text, time: Date.now() }
          : todo
      );
    },
    Toggle: (state, action) => {
      return state
        .map((todo) =>
          todo.id === action.payload
            ? { ...todo, isChecked: !todo.isChecked }
            : todo
        )
    },
  },
});

export const { AddTodo, DeleteTodo, EditTodo, Toggle } = todoSlice.actions;

export default todoSlice.reducer;
