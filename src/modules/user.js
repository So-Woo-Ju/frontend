import { handleActions, createAction } from "redux-actions";
import * as userAPI from "../lib/api/user";
import createRequestThunk, {
  createRequestActionTypes,
} from "../lib/createRequestThunk";

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("user/LOGIN");
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes("user/SIGNUP");
const [MAILCHECK, MAILCHECK_SUCCESS, MAILCHECK_FAILURE] =
  createRequestActionTypes("user/MAILCHECK");
const [CHECK_NUMBER, CHECK_NUMBER_SUCCESS, CHECK_NUMBER_FAILURE] =
  createRequestActionTypes("user/CHECK_NUMBER");
const LOGOUT = "user/LOGOUT";

export const login = createRequestThunk(LOGIN, userAPI.login);
export const logout = createAction(LOGOUT);
export const signup = createRequestThunk(SIGNUP, userAPI.signup);
export const mailCheck = createRequestThunk(MAILCHECK, userAPI.mailCheck);
export const checkNumber = createRequestThunk(
  CHECK_NUMBER,
  userAPI.checkNumber,
);

const initialState = {
  user: null,
  isSend: null,
  isVerify: null,
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
    [SIGNUP_SUCCESS]: (state) => ({
      ...state,
      error: null,
    }),
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      error,
    }),
    [MAILCHECK_SUCCESS]: (state, { payload: { isSend } }) => ({
      ...state,
      isSend,
      error: null,
    }),
    [MAILCHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      isSend: null,
      error,
    }),
    [CHECK_NUMBER_SUCCESS]: (state, { payload: { isVerify } }) => ({
      ...state,
      isVerify,
      error: null,
    }),
    [CHECK_NUMBER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      isVerify: null,
      error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
