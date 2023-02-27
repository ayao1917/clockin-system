import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { State, UserLocation } from "./types";
import type { RootState } from "..";

// Define the initial state using that type
export const initialState: State = {
  location: null,
  locationGetError: null,
  locationGetPending: false,
  locationInfo: null,
};

export const locationSlice = createSlice({
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  name: "location",
  reducers: {
    locationGetError: (state, action: PayloadAction<string>) => {
      state.locationGetPending = false;
      state.locationGetError = action.payload;
      state.location = null;
    },
    locationGetPending: state => {
      state.locationGetPending = true;
    },
    locationGetSuccess: (state, action: PayloadAction<UserLocation>) => {
      state.locationGetPending = false;
      state.locationGetError = null;
      state.location = action.payload;
    },
    locationInfoGetSuccess: (state, action: PayloadAction<string | null>) => {
      state.locationInfo = action.payload;
    }
  },
});

export const {
  locationGetError,
  locationGetPending,
  locationGetSuccess,
  locationInfoGetSuccess,
} = locationSlice.actions;

// Selectors
export const selectLocation = (state: RootState): UserLocation | null => {
  return state.location.location;
};

export const selectLocationInfo = (state: RootState): string | null => {
  return state.location.locationInfo;
};

export const selectLocationGetPending = (state: RootState): boolean => {
  return state.location.locationGetPending;
};

export const selectLocationGetError = (state: RootState): string | null => {
  return state.location.locationGetError;
};

export default locationSlice.reducer;
