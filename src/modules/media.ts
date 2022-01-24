import { createReducer } from "typesafe-actions";
import * as mediaAPI from "../lib/api/media";
import { VideoType } from "../interfaces/interfaces";
import createRequestThunk, {
  createRequestActionTypes,
} from "../lib/createRequestThunk";

const [LOAD, LOAD_SUCCESS, LOAD_FAILURE] =
  createRequestActionTypes("media/LOAD");
const [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAILURE] =
  createRequestActionTypes("media/UPLOAD");

export const load = createRequestThunk(LOAD, mediaAPI.load);
export const upload = createRequestThunk(UPLOAD, mediaAPI.upload);

interface MediaReducer {
  media: VideoType[] | null;
  uploadedMedia: VideoType | null;
  error: string | null;
}

const initialState: MediaReducer = {
  media: null,
  uploadedMedia: null,
  error: null,
};

export default createReducer<MediaReducer>(initialState, {
  [LOAD_SUCCESS]: (state, { payload: { media } }) => ({
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
});
