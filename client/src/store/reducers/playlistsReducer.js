import * as types from "../actions/types";

const initialState = {
  loading: true,
  playlists: []
};

const fetchPlaylists = (state, payload) => {
  return { ...state, playlists: payload };
};

const fetchPlaylistsStart = (state, payload) => {
  return { ...state, loading: true };
};

const fetchPlaylistsEnd = (state, payload) => {
  return { ...state, loading: false };
};

const createPlaylist = (state, payload) => {
  const playlists = [...state.playlists];
  playlists.push(payload);
  return { ...state, playlists };
};

const editPlaylist = (state, payload) => {
  const playlists = [...state.playlists];
  const index = state.playlists.findIndex(el => el._id === payload._id);
  playlists[index] = payload;
  return { ...state, playlists };
};

const removePlaylist = (state, payload) => {
  const playlists = [...state.playlists];
  const index = state.playlists.findIndex(el => el._id === payload._id);
  playlists.splice(index, 1);
  return { ...state, playlists };
};

const addToPlaylist = (state, payload) => {
  const playlists = [...state.playlists];
  const index = state.playlists.findIndex(el => el._id === payload._id);
  playlists[index] = payload;
  return { ...state, playlists };
};

const removeFromPlaylist = (state, payload) => {
  const playlists = [...state.playlists];
  const index = state.playlists.findIndex(el => el._id === payload._id);
  playlists[index] = payload;
  return { ...state, playlists };
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_PLAYLISTS:
      return fetchPlaylists(state, payload);

    case types.FETCH_PLAYLISTS_START:
      return fetchPlaylistsStart(state, payload);

    case types.FETCH_PLAYLISTS_END:
      return fetchPlaylistsEnd(state, payload);

    case types.CREATE_PLAYLIST:
      return createPlaylist(state, payload);

    case types.EDIT_PLAYLIST:
      return editPlaylist(state, payload);

    case types.REMOVE_PLAYLIST:
      return removePlaylist(state, payload);

    case types.ADD_TO_PLAYLIST:
      return addToPlaylist(state, payload);

    case types.REMOVE_FROM_PLAYLIST:
      return removeFromPlaylist(state, payload);

    default:
      return state;
  }
}
