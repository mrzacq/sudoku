import { combineReducers } from "redux";

import boardReducer from "./boardReducer";
import userReducer from "./userReducer";

const reducer = combineReducers({
  userReducer,
  boardReducer,
});

export default reducer;
