import axios from "axios";
import { startLoading, endLoading } from "./loadingActions";
import { setErrors } from "./errorsActions";
import * as types from "./types";

export const fetchPlaylist = payload => dispatch => {
  dispatch(startLoading());
  axios
    .get(`/${payload[2]}/${payload[3]}`)
    .then(res => {
      dispatch(fetchPlaylistSync(res.data));
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(setErrors({ err }));
      dispatch(endLoading());
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
