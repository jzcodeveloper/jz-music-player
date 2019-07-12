import axios from "axios";
import * as types from "./types";

export const addToPlaylist = (route, playlistId, itemId) => async dispatch => {
  try {
    const { data } = await axios.put(
      `/playlists/add-${route}/${playlistId}/${itemId}`
    );
    dispatch({ type: types.ADD_TO_PLAYLIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPlaylist = payload => async dispatch => {
  try {
    const { data } = await axios.post("/playlists/create", payload);
    dispatch({ type: types.CREATE_PLAYLIST, payload: data });
    dispatch({ type: types.SET_ERRORS, payload: {} });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.SET_ERRORS, payload: error.response.data });
  }
};

export const editPlaylist = (playlistId, payload) => async dispatch => {
  try {
    const { data } = await axios.put(`/playlists/edit/${playlistId}`, payload);
    dispatch({ type: types.EDIT_PLAYLIST, payload: data });
    dispatch({ type: types.SET_ERRORS, payload: {} });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.SET_ERRORS, payload: error.response.data });
  }
};

export const removePlaylist = playlistId => async dispatch => {
  try {
    const { data } = await axios.delete(`/playlists/remove/${playlistId}`);
    dispatch({ type: types.REMOVE_PLAYLIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const removeFromPlaylist = (playlistId, songId) => async dispatch => {
  try {
    const { data } = await axios.delete(
      `/playlists/remove-song/${playlistId}/${songId}`
    );
    dispatch({ type: types.REMOVE_FROM_PLAYLIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchPlaylists = () => async dispatch => {
  dispatch({ type: types.FETCH_PLAYLISTS_START });
  try {
    const { data } = await axios.get(`/playlists/all`);
    dispatch({ type: types.FETCH_PLAYLISTS, payload: data });
    dispatch({ type: types.FETCH_PLAYLISTS_END });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.FETCH_PLAYLISTS_END });
  }
};
