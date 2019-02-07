import axios from "axios";
import { startLoading, endLoading } from "./loadingActions";
import { setErrors } from "./errorsActions";
import * as types from "./types";

export const fetchMore = (payload, from, limit, query = "") => dispatch => {
  dispatch(startLoading());
  axios
    .get(`/${payload}?from=${from}&limit=${limit}&query=${query}`)
    .then(res => {
      dispatch(fetchMoreSync(res.data, payload));
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(setErrors(err));
      dispatch(endLoading());
    });
};

export const fetchMoreSync = (payload, pathname) => {
  return {
    type: types.FETCH_MORE,
    payload,
    pathname
  };
};

export const fetchLoadMore = (payload, from, limit, query = "") => dispatch => {
  axios
    .get(`/${payload}?from=${from}&limit=${limit}&query=${query}`)
    .then(res => {
      dispatch(fetchLoadMoreSync(res.data, payload));
    })
    .catch(err => {
      dispatch(setErrors(err));
    });
};

export const fetchLoadMoreSync = (payload, pathname) => {
  return {
    type: types.FETCH_LOAD_MORE,
    payload,
    pathname
  };
};
