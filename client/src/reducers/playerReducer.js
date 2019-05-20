import * as types from "../actions/types";

const initialState = {
  playlist: [],
  currentSongIndex: 0,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PLAYLIST:
      return {
        ...state,
        playlist: action.payload
      };
    case types.FETCH_PLAYLIST_START: {
      return {
        ...state,
        loading: true
      };
    }
    case types.FETCH_PLAYLIST_END: {
      return {
        ...state,
        loading: false
      };
    }
    case types.RESET_PLAYLIST:
      return {
        ...state,
        playlist: [],
        currentSongIndex: 0
      };
    case types.SET_SONG_INDEX:
      return {
        ...state,
        currentSongIndex: action.payload
      };
    case types.SET_PREVIOUS_INDEX:
      return {
        ...state,
        currentSongIndex: state.currentSongIndex - 1
      };
    case types.SET_NEXT_INDEX:
      return {
        ...state,
        currentSongIndex: state.currentSongIndex + 1
      };

    default:
      return state;
  }
}
