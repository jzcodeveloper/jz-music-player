import * as types from "../actions/types";
import { updateObject } from "../utils/utility";

const initialState = {
  playlist: [],
  currentSongIndex: 0,
  loading: false
};

const fetchPlaylist = (state, action) => {
  return updateObject(state, { playlist: action.payload });
};

const fetchPlaylistStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchPlaylistEnd = (state, action) => {
  return updateObject(state, { loading: false });
};

const resetPlaylist = (state, action) => {
  return updateObject(state, { playlist: [], currentSongIndex: 0 });
};

const setSongIndex = (state, action) => {
  return updateObject(state, { currentSongIndex: action.payload });
};

const setPreviousIndex = (state, action) => {
  return updateObject(state, { currentSongIndex: state.currentSongIndex - 1 });
};

const setNextIndex = (state, action) => {
  return updateObject(state, { currentSongIndex: state.currentSongIndex + 1 });
};

const setRandomIndex = (state, action) => {
  const length = state.playlist.length;
  const index = Math.floor(Math.random() * Math.floor(length));

  return updateObject(state, { currentSongIndex: index });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PLAYLIST:
      return fetchPlaylist(state, action);

    case types.FETCH_PLAYLIST_START: {
      return fetchPlaylistStart(state, action);
    }
    case types.FETCH_PLAYLIST_END: {
      return fetchPlaylistEnd(state, action);
    }
    case types.RESET_PLAYLIST:
      return resetPlaylist(state, action);

    case types.SET_SONG_INDEX:
      return setSongIndex(state, action);

    case types.SET_PREVIOUS_INDEX:
      return setPreviousIndex(state, action);

    case types.SET_NEXT_INDEX:
      return setNextIndex(state, action);

    case types.SET_RANDOM_INDEX:
      return setRandomIndex(state, action);

    default:
      return state;
  }
}
