import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Company, State } from "./types";
import type { RootState } from "..";

// Define the initial state using that type
const initialState: State = {
  companies: [],
  searchError: null,
  searchPending: false,
};

export const searchSlice = createSlice({
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  name: "search",
  reducers: {
    searchError: (state, action: PayloadAction<string>) => {
      state.searchPending = false;
      state.searchError = action.payload;
      state.companies = [];
    },
    searchPending: state => {
      state.searchPending = true;
    },
    searchSuccess: (state, action: PayloadAction<Company[]>) => {
      state.searchPending = false;
      state.searchError = null;
      state.companies = action.payload;
    },
  },
});

export const {
  searchError,
  searchPending,
  searchSuccess,
} = searchSlice.actions;

// Selectors
export const selectCompanies = (state: RootState) => {
  return state.search.companies;
};

export default searchSlice.reducer;
