import * as types from "../actions/types";

const initialState = {
  loading: false,
  playlists: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PLAYLISTS: {
      return {
        ...state,
        playlists: action.payload
      };
    }
    case types.FETCH_PLAYLISTS_START: {
      return {
        ...state,
        loading: true
      };
    }
    case types.FETCH_PLAYLISTS_END: {
      return {
        ...state,
        loading: false
      };
    }
    case types.CREATE_PLAYLIST: {
      const playlists = [...state.playlists];
      playlists.push(action.payload);
      return {
        ...state,
        playlists
      };
    }
    case types.EDIT_PLAYLIST: {
      const playlists = [...state.playlists];
      const index = state.playlists.findIndex(
        el => el._id === action.payload._id
      );
      playlists[index] = action.payload;
      return {
        ...state,
        playlists
      };
    }
    case types.REMOVE_PLAYLIST: {
      const playlists = [...state.playlists];
      const index = state.playlists.findIndex(
        el => el._id === action.payload._id
      );
      playlists.splice(index, 1);
      return {
        ...state,
        playlists
      };
    }
    case types.ADD_TO_PLAYLIST: {
      const playlists = [...state.playlists];
      const index = state.playlists.findIndex(
        el => el._id === action.payload._id
      );
      playlists[index] = action.payload;
      return {
        ...state,
        playlists
      };
    }
    case types.REMOVE_FROM_PLAYLIST: {
      const playlists = [...state.playlists];
      const index = state.playlists.findIndex(
        el => el._id === action.payload._id
      );
      playlists[index] = action.payload;
      return {
        ...state,
        playlists
      };
    }

    default:
      return state;
  }
}
