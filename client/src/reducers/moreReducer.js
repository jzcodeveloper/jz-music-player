import * as types from "../actions/types";
import { updateObject } from "../utils/utility";

const initialState = {
  more: {
    albums: { count: 0, info: [] },
    artists: { count: 0, info: [] },
    songs: { count: 0, info: [] }
  },
  loading: false
};

const fetchMore = (state, action) => {
  const more = JSON.parse(JSON.stringify(state.more));
  more[action.pathname].info = action.payload.info;
  more[action.pathname].count = action.payload.count;

  return updateObject(state, { more });
};

const fetchMoreStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchMoreEnd = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchLoadMore = (state, action) => {
  const more = JSON.parse(JSON.stringify(state.more));
  more[action.pathname].info = [
    ...state.more[action.pathname].info,
    ...action.payload.info
  ];
  more[action.pathname].count = action.payload.count;

  return updateObject(state, { more });
};

const updateFavorites = (state, action) => {
  const payload = action.payload;
  const albums = [...state.more.albums.info];
  const artists = [...state.more.artists.info];
  const songs = [...state.more.songs.info];
  const albumIndex = albums.findIndex(el => el._id === payload._id);
  const artistIndex = artists.findIndex(el => el._id === payload._id);
  const songIndex = songs.findIndex(el => el._id === payload._id);
  if (albumIndex >= 0) albums[albumIndex] = payload;
  if (artistIndex >= 0) artists[artistIndex] = payload;
  if (songIndex >= 0) songs[songIndex] = payload;

  return updateObject(state, {
    more: {
      albums: { count: state.more.albums.count, info: albums },
      artists: { count: state.more.artists.count, info: artists },
      songs: { count: state.more.songs.count, info: songs }
    }
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MORE:
      return fetchMore(state, action);

    case types.FETCH_MORE_START:
      return fetchMoreStart(state, action);

    case types.FETCH_MORE_END:
      return fetchMoreEnd(state, action);

    case types.FETCH_LOAD_MORE:
      return fetchLoadMore(state, action);

    case types.UPDATE_FAVORITES:
      return updateFavorites(state, action);

    default:
      return state;
  }
}
