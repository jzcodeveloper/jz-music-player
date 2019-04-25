import axios from "axios";
import { setErrors } from "./errorsActions";
import * as types from "./types";

export const fetchMetadata = (payload = 6) => dispatch => {
  dispatch(fetchMetadataStart());
  axios
    .get("/metadata?limit=" + payload)
    .then(res => {
      dispatch(fetchMetadataSync(res.data));
      dispatch(fetchMetadataEnd());
    })
    .catch(err => {
      dispatch(setErrors({ err }));
      dispatch(fetchMetadataEnd());
    });
};

export const fetchMetadataSync = payload => {
  return {
    type: types.FETCH_METADATA,
    payload
  };
};

export const fetchMetadataStart = () => {
  return {
    type: types.FETCH_METADATA_START
  };
};

export const fetchMetadataEnd = () => {
  return {
    type: types.FETCH_METADATA_END
  };
};
