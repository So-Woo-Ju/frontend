import { combineReducers } from "redux";
import user from "./user";
import media from "./media";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persisConfig = {
  key: "sowooju",
  storage,
};

const rootReducer = combineReducers({
  user,
  media,
});

const persistedReducer = persistReducer(persisConfig, rootReducer);

export default persistedReducer;
