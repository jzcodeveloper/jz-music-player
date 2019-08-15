import axios from "../axios";
import * as types from "./types";

export const fetchPlaylist = payload => async dispatch => {
  dispatch({ type: types.FETCH_PLAYLIST_START });
  try {
    const { data } = await axios.get(`/metadata/${payload[2]}/${payload[3]}`);
    dispatch({ type: types.FETCH_PLAYLIST, payload: data });
    dispatch({ type: types.FETCH_PLAYLIST_END });

    // Updates item metadata (timesPlayed property)
    await axios.get(`/metadata/update/${payload[2]}/${payload[3]}`);
  } catch (error) {
    console.log(error);
    dispatch({ type: types.FETCH_PLAYLIST_END });
  }
};

export const resetPlaylist = () => ({ type: types.RESET_PLAYLIST });

export const setPreviousIndex = () => ({ type: types.SET_PREVIOUS_INDEX });

export const setNextIndex = () => ({ type: types.SET_NEXT_INDEX });

export const setRandomIndex = () => ({ type: types.SET_RANDOM_INDEX });

export const setSongIndex = index => ({
  type: types.SET_SONG_INDEX,
  payload: index
});
