import axios from "axios";
import { setErrors } from "./errorsActions";
import * as types from "./types";

export const fetchPlaylist = payload => dispatch => {
  dispatch(fetchPlaylistStart());
  axios
    .get(`/${payload[2]}/${payload[3]}`)
    .then(res => {
      dispatch(fetchPlaylistSync(res.data));
      dispatch(fetchPlaylistEnd());
    })
    .catch(err => {
      dispatch(setErrors({ err }));
      dispatch(fetchPlaylistEnd());
    });
};

export const fetchPlaylistSync = payload => {
  return {
    type: types.FETCH_PLAYLIST,
    payload
  };
};

export const resetPlaylist = () => {
  return {
    type: types.RESET_PLAYLIST
  };
};

export const setSongIndex = payload => {
  return {
    type: types.SET_SONG_INDEX,
    payload
  };
};

export const setNextIndex = () => {
  return {
    type: types.SET_NEXT_INDEX
  };
};

export const fetchPlaylistStart = () => {
  return {
    type: types.FETCH_PLAYLIST_START
  };
};

export const fetchPlaylistEnd = () => {
  return {
    type: types.FETCH_PLAYLIST_END
  };
};
