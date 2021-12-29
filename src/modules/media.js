import { handleActions } from "redux-actions";
import * as mediaAPI from "../lib/api/media";
import createRequestThunk, {
  createRequestActionTypes,
} from "../lib/createRequestThunk";

const [LOAD, LOAD_SUCCESS, LOAD_FAILURE] =
  createRequestActionTypes("media/LOAD");

export const load = createRequestThunk(LOAD, mediaAPI.load);

const initialState = {
  media: null,
};

export default handleActions(
  {
    [LOAD_SUCCESS]: (state, { payload: media }) => ({
      ...state,
      media,
      error: null,
    }),
    [LOAD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      media: null,
      error,
    }),
  },
  initialState,
);
