import { configureStore, combineReducers } from "@reduxjs/toolkit";

import treeSlice from "./treeSlice.tsx";
import selectedItem from "./selectedItem";

const rootReducer = combineReducers({ treeSlice, selectedItem });

export const createStore = () => configureStore({ reducer: rootReducer });
