import axios from "../axios";
import * as types from "./types";

export const fetchMore = (payload, from, limit, query) => async dispatch => {
  dispatch({ type: types.FETCH_MORE_START });
  try {
    const { data } = await axios.get(
      `/metadata/${payload}?from=${from}&limit=${limit}&query=${query}`
    );
    dispatch({
      type: types.FETCH_MORE,
      payload: { ...data, pathname: payload }
    });
    dispatch({ type: types.FETCH_MORE_END });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.FETCH_MORE_END });
  }
};

export const fetchLoadMore = (
  payload,
  from,
  limit,
  query
) => async dispatch => {
  try {
    const { data } = await axios.get(
      `/metadata/${payload}?from=${from}&limit=${limit}&query=${query}`
    );
    dispatch({
      type: types.FETCH_LOAD_MORE,
      payload: { ...data, pathname: payload }
    });
  } catch (error) {
    console.log(error);
  }
};
