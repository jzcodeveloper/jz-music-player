import axios from "axios";
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
  dispatch(fetchFavoritesStart());
  axios
    .get("/favorites/all")
    .then(res => {
      dispatch(fetchFavoritesSync(res.data));
      dispatch(fetchFavoritesEnd());
    })
    .catch(err => dispatch(fetchFavoritesEnd()));
};

export const fetchFavoritesSync = payload => {
  return {
    type: types.FETCH_FAVORITES,
    payload
  };
};

export const fetchFavoritesStart = () => {
  return {
    type: types.FETCH_FAVORITES_START
  };
};

export const fetchFavoritesEnd = () => {
  return {
    type: types.FETCH_FAVORITES_END
  };
};
