import axios from "axios";
import * as types from "./types";
import { setErrors } from "./errorsActions";

export const addToPlaylist = (route, playlistId, itemId) => dispatch => {
  axios
    .put(`/playlists/add-${route}/${playlistId}/${itemId}`)
    .then(res => dispatch(addToPlaylistSync(res.data)))
    .catch(err => {});
};

export const addToPlaylistSync = payload => {
  return {
    type: types.ADD_TO_PLAYLIST,
    payload
  };
};

export const createPlaylist = payload => dispatch => {
  axios
    .post("/playlists/create", payload)
    .then(res => {
      dispatch(createPlaylistSync(res.data));
      dispatch(setErrors());
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

export const createPlaylistSync = payload => {
  return {
    type: types.CREATE_PLAYLIST,
    payload
  };
};

export const editPlaylist = (playlistId, payload) => dispatch => {
  axios
    .put(`/playlists/edit/${playlistId}`, payload)
    .then(res => {
      dispatch(editPlaylistSync(res.data));
      dispatch(setErrors());
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

export const editPlaylistSync = payload => {
  return {
    type: types.EDIT_PLAYLIST,
    payload
  };
};

export const removePlaylist = playlistId => dispatch => {
  axios
    .delete(`/playlists/remove/${playlistId}`)
    .then(res => dispatch(removePlaylistSync(res.data)))
    .catch(err => {});
};

export const removePlaylistSync = payload => {
  return {
    type: types.REMOVE_PLAYLIST,
    payload
  };
};

export const removeFromPlaylist = (playlistId, songId) => dispatch => {
  axios
    .delete(`/playlists/remove-song/${playlistId}/${songId}`)
    .then(res => dispatch(removeFromPlaylistSync(res.data)))
    .catch(err => {});
};

export const removeFromPlaylistSync = payload => {
  return {
    type: types.REMOVE_FROM_PLAYLIST,
    payload
  };
};

export const fetchPlaylists = userId => dispatch => {
  dispatch(fetchPlaylistsStart());
  axios
    .get(`/playlists/all/${userId}`)
    .then(res => {
      dispatch(fetchPlaylistsSync(res.data));
      dispatch(fetchPlaylistsEnd());
    })
    .catch(err => dispatch(fetchPlaylistsEnd()));
};

export const fetchPlaylistsSync = payload => {
  return {
    type: types.FETCH_PLAYLISTS,
    payload
  };
};

export const fetchPlaylistsStart = () => {
  return {
    type: types.FETCH_PLAYLISTS_START
  };
};

export const fetchPlaylistsEnd = () => {
  return {
    type: types.FETCH_PLAYLISTS_END
  };
};
