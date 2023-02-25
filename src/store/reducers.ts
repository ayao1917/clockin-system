import { combineReducers, Reducer } from "redux";

import searchReducer from "./search/slice";

const rootReducer: Reducer = combineReducers({
  search: searchReducer,
});

export default rootReducer;
