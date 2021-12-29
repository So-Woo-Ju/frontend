import { handleActions } from "redux-actions";
import * as mediaAPI from "../lib/api/media";
import createRequestThunk, {
  createRequestActionTypes,
} from "../lib/createRequestThunk";

const [LOAD, LOAD_SUCCESS, LOAD_FAILURE] =
  createRequestActionTypes("media/LOAD");
const [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAILURE] =
  createRequestActionTypes("media/UPLOAD");

export const load = createRequestThunk(LOAD, mediaAPI.load);
export const upload = createRequestThunk(UPLOAD, mediaAPI.upload);

const initialState = {
  media: null,
  uploadedMedia: null,
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
    [UPLOAD_SUCCESS]: (state, { payload: uploadedMedia }) => ({
      ...state,
      uploadedMedia,
      error: null,
    }),
    [UPLOAD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      uploadedMedia: null,
      error,
    }),
  },
  initialState,
);
