import axios from "axios";
import * as types from "./types";

export const updateFavorites = (route, id) => async dispatch => {
  try {
    const { data } = await axios.get(`/favorites/${route}/${id}`);
    dispatch({ type: types.UPDATE_FAVORITES, payload: { data, route } });
  } catch (error) {
    console.log(error);
  }
};

export const fetchFavorites = () => async dispatch => {
  dispatch({ type: types.FETCH_FAVORITES_START });
  try {
    const { data } = await axios.get("/favorites/all");
    dispatch({ type: types.FETCH_FAVORITES, payload: data });
    dispatch({ type: types.FETCH_FAVORITES_END });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.FETCH_FAVORITES_END });
  }
};
