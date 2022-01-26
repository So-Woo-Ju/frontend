import { combineReducers } from "redux";
import media from "./media";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persisConfig = {
  key: "sowooju",
  storage,
};

const rootReducer = combineReducers({
  media,
});

const persistedReducer = persistReducer(persisConfig, rootReducer);

export type RootState = ReturnType<typeof persistedReducer>;

export default persistedReducer;
