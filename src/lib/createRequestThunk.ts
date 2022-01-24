export const createRequestActionTypes = (type: string) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestThunk(type: string, request: any) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return (params?: any) => async (dispatch: any) => {
    dispatch({ type });
    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data.data,
      });
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      });
      throw e;
    }
  };
}
