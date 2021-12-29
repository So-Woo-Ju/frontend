import { combineReducers } from "redux";
import user from "./user";
import media from "./media";

const rootReducer = combineReducers({
  user,
  media,
});

export default rootReducer;
