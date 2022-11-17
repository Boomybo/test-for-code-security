import { createSlice } from "@reduxjs/toolkit";

interface ITree {
  tree:
    | string
    | {
        [key: string]: {
          [key: string]: {
            [key: string]:
              | Array<string>
              | {
                  [key: string]: string | number | boolean;
                };
          };
        };
      };
  fileName?: string;
}

const initialState: ITree = {
  tree: "",
  fileName: "",
};

const treeSlice = createSlice({
  name: "tree",
  initialState: initialState,
  reducers: {
    setTree: (state, action) => {
      return {
        ...state,
        tree: JSON.parse(action.payload),
      };
    },
    mutateAllTree: (state, action) => {
      const { company, mark, direction, charachteristic, value } =
        action.payload;
      return {
        ...state,
        tree: {
          ...(state.tree as {}),
          [company]: {
            ...state.tree[company],
            [mark]: {
              ...state.tree[company][mark],
              [direction]: {
                ...state.tree[company][mark][direction],
                [charachteristic]: value,
              },
            },
          },
        } as {},
      };
    },
    setFileName: (state, action) => {
      return {
        ...state,
        fileName: action.payload,
      };
    },
  },
});

export const { setTree, mutateAllTree, setFileName } = treeSlice.actions;

export default treeSlice.reducer;
