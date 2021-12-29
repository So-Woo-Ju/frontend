import { handleActions, createAction } from "redux-actions";
import * as userAPI from "../lib/api/user";
import createRequestThunk, {
  createRequestActionTypes,
} from "../lib/createRequestThunk";

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("user/LOGIN");
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes("user/SIGNUP");
const [DOUBLECHECK, DOUBLECHECK_SUCCESS, DOUBLECHECK_FAILURE] =
  createRequestActionTypes("user/DOUBLECHECK");
const LOGOUT = "user/LOGOUT";

export const login = createRequestThunk(LOGIN, userAPI.login);
export const logout = createAction(LOGOUT);
export const signup = createRequestThunk(SIGNUP, userAPI.signup);
export const doublecheck = createRequestThunk(DOUBLECHECK, userAPI.doublecheck);

const initialState = {
  user: null,
  double: null,
};

export default handleActions(
  {
    [LOGIN_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      error: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      error,
    }),
    [SIGNUP_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      error: null,
    }),
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      error,
    }),
    [DOUBLECHECK_SUCCESS]: (state, { payload: double }) => ({
      ...state,
      double,
      error: null,
    }),
    [DOUBLECHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      double: null,
      error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
