import axios from "axios";
import { setErrors } from "./errorsActions";
import * as types from "./types";

export const fetchMore = (payload, from, limit, query = "") => dispatch => {
  dispatch(fetchMoreStart());
  axios
    .get(`/${payload}?from=${from}&limit=${limit}&query=${query}`)
    .then(res => {
      dispatch(fetchMoreSync(res.data, payload));
      dispatch(fetchMoreEnd());
    })
    .catch(err => {
      dispatch(setErrors(err));
      dispatch(fetchMoreEnd());
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

export const fetchMoreStart = () => {
  return {
    type: types.FETCH_MORE_START
  };
};

export const fetchMoreEnd = () => {
  return {
    type: types.FETCH_MORE_END
  };
};
