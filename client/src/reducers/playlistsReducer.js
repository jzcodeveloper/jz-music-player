import * as types from "../actions/types";
import { updateObject } from "../utils/utility";

const initialState = {
  loading: false,
  playlists: []
};

const fetchPlaylists = (state, action) => {
  return updateObject(state, { playlists: action.payload });
};
const fetchPlaylistsStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchPlaylistsEnd = (state, action) => {
  return updateObject(state, { loading: false });
};
const createPlaylist = (state, action) => {
  const playlists = [...state.playlists];
  playlists.push(action.payload);

  return updateObject(state, { playlists });
};
const editPlaylist = (state, action) => {
  const playlists = [...state.playlists];
  const index = state.playlists.findIndex(el => el._id === action.payload._id);
  playlists[index] = action.payload;

  return updateObject(state, { playlists });
};
const removePlaylist = (state, action) => {
  const playlists = [...state.playlists];
  const index = state.playlists.findIndex(el => el._id === action.payload._id);
  playlists.splice(index, 1);

  return updateObject(state, { playlists });
};
const addToPlaylist = (state, action) => {
  const playlists = [...state.playlists];
  const index = state.playlists.findIndex(el => el._id === action.payload._id);
  playlists[index] = action.payload;

  return updateObject(state, { playlists });
};
const removeFromPlaylist = (state, action) => {
  const playlists = [...state.playlists];
  const index = state.playlists.findIndex(el => el._id === action.payload._id);
  playlists[index] = action.payload;

  return updateObject(state, { playlists });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PLAYLISTS:
      return fetchPlaylists(state, action);

    case types.FETCH_PLAYLISTS_START:
      return fetchPlaylistsStart(state, action);

    case types.FETCH_PLAYLISTS_END:
      return fetchPlaylistsEnd(state, action);

    case types.CREATE_PLAYLIST:
      return createPlaylist(state, action);

    case types.EDIT_PLAYLIST:
      return editPlaylist(state, action);

    case types.REMOVE_PLAYLIST:
      return removePlaylist(state, action);

    case types.ADD_TO_PLAYLIST:
      return addToPlaylist(state, action);

    case types.REMOVE_FROM_PLAYLIST:
      return removeFromPlaylist(state, action);

    default:
      return state;
  }
}
