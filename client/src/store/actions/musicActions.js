import axios from "../axios";
import * as types from "./types";

export const fetchMetadata = (payload = 6) => async dispatch => {
  dispatch({ type: types.FETCH_METADATA_START });
  try {
    const { data } = await axios.get(`/metadata/metadata?limit=${payload}`);
    dispatch({ type: types.FETCH_METADATA, payload: data });
    dispatch({ type: types.FETCH_METADATA_END });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.FETCH_METADATA_END });
  }
};
