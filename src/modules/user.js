import { handleActions } from "redux-actions";
import * as userAPI from "../lib/api/user";
import createRequestThunk, {
  createRequestActionTypes,
} from "../lib/createRequestThunk";

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("user/LOGIN");

export const login = createRequestThunk(LOGIN, userAPI.login);

const initialState = {
  login: null,
};

export default handleActions(
  {
    [LOGIN_SUCCESS]: (state, { payload: login }) => ({
      ...state,
      login,
      error: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      login: null,
      error,
    }),
  },
  initialState,
);
