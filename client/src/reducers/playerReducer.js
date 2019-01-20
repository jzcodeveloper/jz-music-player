import * as types from "../actions/types";

const initialState = {
  playlist: [],
  currentSongIndex: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PLAYLIST:
      return {
        ...state,
        playlist: action.payload
      };
    case types.RESET_PLAYLIST:
      return {
        playlist: [],
        currentSongIndex: 0
      };
    case types.SET_SONG_INDEX:
      return {
        ...state,
        currentSongIndex: action.payload
      };
    case types.SET_NEXT_INDEX:
      return {
        ...state,
        loading: false,
        currentSongIndex: state.currentSongIndex + 1
      };

    default:
      return state;
  }
}
