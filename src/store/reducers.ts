import { combineReducers, Reducer } from "redux";

import locationReducer from "./location/slice";

const rootReducer: Reducer = combineReducers({
  location: locationReducer,
});

export default rootReducer;
