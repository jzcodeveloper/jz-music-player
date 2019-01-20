import axios from "axios";
import { startLoading, endLoading } from "./loadingActions";
import { setErrors } from "./errorsActions";
import * as types from "./types";

export const fetchMetadata = (payload = 5) => dispatch => {
  dispatch(startLoading());
  axios
    .get("/metadata?limit=" + payload)
    .then(res => {
      dispatch(fetchMetadataSync(res.data));
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(setErrors({ err }));
      dispatch(endLoading());
    });
};

export const fetchMetadataSync = payload => {
  return {
    type: types.FETCH_METADATA,
    payload
  };
};
