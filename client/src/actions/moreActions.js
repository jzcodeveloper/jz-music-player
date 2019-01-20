import axios from "axios";
import { startLoading, endLoading } from "./loadingActions";
import { setErrors } from "./errorsActions";
import * as types from "./types";

export const fetchMore = (payload, from, limit) => dispatch => {
  dispatch(startLoading());
  axios
    .get(`/${payload}?from=${from}&limit=${limit}`)
    .then(res => {
      dispatch(fetchMoreSync(res.data));
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(setErrors(err));
      dispatch(endLoading());
    });
};

export const fetchMoreSync = payload => {
  return {
    type: types.FETCH_MORE,
    payload
  };
};

export const fetchLoadMore = (payload, from, limit) => dispatch => {
  axios
    .get(`/${payload}?from=${from}&limit=${limit}`)
    .then(res => {
      dispatch(fetchLoadMoreSync(res.data));
    })
    .catch(err => {
      dispatch(setErrors(err));
    });
};

export const fetchLoadMoreSync = payload => {
  return {
    type: types.FETCH_LOAD_MORE,
    payload
  };
};
