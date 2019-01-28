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
