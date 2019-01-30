import axios from "axios";
import { startLoading, endLoading } from "./loadingActions";
import * as types from "./types";

export const updateFavorites = (route, id) => dispatch => {
  axios
    .get(`/favorites/${route}/${id}`)
    .then(res => dispatch(updateFavoritesSync(res.data)))
    .catch(err => {});
};

export const updateFavoritesSync = payload => {
  return {
    type: types.UPDATE_FAVORITES,
    payload
  };
};

export const fetchFavorites = () => dispatch => {
  dispatch(startLoading);
  axios
    .get("/favorites/all")
    .then(res => {
      dispatch(fetchFavoritesSync(res.data));
      dispatch(endLoading());
    })
    .catch(err => dispatch(endLoading()));
};

export const fetchFavoritesSync = payload => {
  return {
    type: types.FETCH_FAVORITES,
    payload
  };
};
