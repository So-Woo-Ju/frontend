import { createReducer, createAction } from "typesafe-actions";
import * as userAPI from "lib/api/user";
import createRequestThunk, {
  createRequestActionTypes,
} from "lib/createRequestThunk";

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("user/LOGIN");
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes("user/SIGNUP");
const [MAILCHECK, MAILCHECK_SUCCESS, MAILCHECK_FAILURE] =
  createRequestActionTypes("user/MAILCHECK");
const [CHECK_NUMBER, CHECK_NUMBER_SUCCESS, CHECK_NUMBER_FAILURE] =
  createRequestActionTypes("user/CHECK_NUMBER");
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] =
  createRequestActionTypes("user/LOGOUT");
const RENEWAL_EXPIRES = "user/RENEWAL_EXPIRES";
const [KAKAO_LOGIN, KAKAO_LOGIN_SUCCESS, KAKAO_LOGIN_FAILURE] =
  createRequestActionTypes("user/KAKAO_LOGIN");
const [GOOGLE_LOGIN, GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_FAILURE] =
  createRequestActionTypes("user/GOOGLE_LOGIN");

export const login = createRequestThunk(LOGIN, userAPI.login);
export const logout = createRequestThunk(LOGOUT, userAPI.logout);
export const signup = createRequestThunk(SIGNUP, userAPI.signup);
export const mailCheck = createRequestThunk(MAILCHECK, userAPI.mailCheck);
export const checkNumber = createRequestThunk(
  CHECK_NUMBER,
  userAPI.checkNumber,
);
export const renewalExpires = createAction(RENEWAL_EXPIRES)();
export const kakaoLogin = createRequestThunk(KAKAO_LOGIN, userAPI.kakaoLogin);
export const googleLogin = createRequestThunk(
  GOOGLE_LOGIN,
  userAPI.googleLogin,
);

interface UserReducer {
  email: string;
  login: boolean;
  isSend: boolean;
  isVerify: boolean;
  tokenExp: string;
  error: string | null;
}

const initialState: UserReducer = {
  email: "",
  login: false,
  isSend: false,
  isVerify: false,
  tokenExp: "",
  error: null,
};

export default createReducer<UserReducer>(initialState, {
  [LOGIN_SUCCESS]: (state, { payload: data }) => ({
    ...state,
    login: data.login,
    tokenExp: data.tokenExp,
    error: null,
  }),
  [LOGIN_FAILURE]: (state, { payload: error }) => ({
    ...state,
    login: false,
    error,
  }),
  [SIGNUP_SUCCESS]: (state) => ({
    ...state,
    error: null,
  }),
  [SIGNUP_FAILURE]: (state, { payload: error }) => ({
    ...state,
    login: false,
    error,
  }),
  [MAILCHECK_SUCCESS]: (state, { payload: { isSend } }) => ({
    ...state,
    isSend,
    error: null,
  }),
  [MAILCHECK_FAILURE]: (state, { payload: error }) => ({
    ...state,
    isSend: false,
    error,
  }),
  [CHECK_NUMBER_SUCCESS]: (state, { payload: { isVerify } }) => ({
    ...state,
    isVerify,
    error: null,
  }),
  [CHECK_NUMBER_FAILURE]: (state, { payload: error }) => ({
    ...state,
    isVerify: false,
    error,
  }),
  [LOGOUT_SUCCESS]: (state, { payload: login }) => ({
    ...state,
    login,
    error: null,
  }),
  [LOGOUT_FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
  }),
  [RENEWAL_EXPIRES]: (state, { payload: tokenExp }) => ({
    ...state,
    tokenExp,
  }),
  [KAKAO_LOGIN_SUCCESS]: (state) => ({
    ...state,
    error: null,
  }),
  [KAKAO_LOGIN_FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
  }),
  [GOOGLE_LOGIN_SUCCESS]: (state) => ({
    ...state,
    error: null,
  }),
  [GOOGLE_LOGIN_FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
  }),
});
