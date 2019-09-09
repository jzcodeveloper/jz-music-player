import * as types from "../actions/types";

const initialState = {
  playlist: [],
  currentSongIndex: 0,
  loading: true
};

const fetchPlaylist = (state, payload) => {
  return { ...state, playlist: payload };
};

const fetchPlaylistStart = (state, payload) => {
  return { ...state, loading: true };
};

const fetchPlaylistEnd = (state, payload) => {
  return { ...state, loading: false };
};

const resetPlaylist = (state, payload) => {
  return { ...state, playlist: [], currentSongIndex: 0 };
};

const setSongIndex = (state, payload) => {
  return { ...state, currentSongIndex: payload };
};

const setPreviousIndex = (state, payload) => {
  return { ...state, currentSongIndex: state.currentSongIndex - 1 };
};

const setNextIndex = (state, payload) => {
  return { ...state, currentSongIndex: state.currentSongIndex + 1 };
};

const setRandomIndex = (state, payload) => {
  const length = state.playlist.length;
  const index = Math.floor(Math.random() * Math.floor(length));
  return { ...state, currentSongIndex: index };
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_PLAYLIST:
      return fetchPlaylist(state, payload);

    case types.FETCH_PLAYLIST_START: {
      return fetchPlaylistStart(state, payload);
    }
    case types.FETCH_PLAYLIST_END: {
      return fetchPlaylistEnd(state, payload);
    }
    case types.RESET_PLAYLIST:
      return resetPlaylist(state, payload);

    case types.SET_SONG_INDEX:
      return setSongIndex(state, payload);

    case types.SET_PREVIOUS_INDEX:
      return setPreviousIndex(state, payload);

    case types.SET_NEXT_INDEX:
      return setNextIndex(state, payload);

    case types.SET_RANDOM_INDEX:
      return setRandomIndex(state, payload);

    default:
      return state;
  }
}
