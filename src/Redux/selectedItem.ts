import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  mainCharachteristics: Array<string> | { [key: string]: string | number };
  options: Array<string> | { [key: string]: string | number };
  fileName?: string;
  company?: string;
  mark?: string;
}

const initialState: IInitialState = {
  mainCharachteristics: [],
  options: [],
};

const selectedItem = createSlice({
  name: "selectedItem",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      return action.payload;
    },
    mutateTree: (state, action) => {
      const { direction, charachteristic, value } = action.payload;
      return {
        ...state,
        [direction]: {
          ...state[direction],
          [charachteristic]: value,
        },
      };
    },
    setFileNameItem: (state, action) => {
      return {
        ...state,
        fileName: action.payload,
      };
    },
  },
});

export const { setSelectedItem, mutateTree, setFileNameItem } =
  selectedItem.actions;

export default selectedItem.reducer;
