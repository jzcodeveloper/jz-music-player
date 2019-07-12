import * as types from "../actions/types";

const initialState = {
  more: {
    albums: { count: 0, info: [] },
    artists: { count: 0, info: [] },
    songs: { count: 0, info: [] }
  },
  loading: true
};

const fetchMore = (state, payload) => {
  const { pathname, count, info } = payload;
  const more = JSON.parse(JSON.stringify(state.more));
  more[pathname].info = info;
  more[pathname].count = count;
  return { ...state, more };
};

const fetchMoreStart = (state, payload) => {
  return { ...state, loading: true };
};

const fetchMoreEnd = (state, payload) => {
  return { ...state, loading: false };
};

const fetchLoadMore = (state, payload) => {
  const { pathname, count, info } = payload;
  const more = JSON.parse(JSON.stringify(state.more));
  more[pathname].info = [...state.more[pathname].info, ...info];
  more[pathname].count = count;
  return { ...state, more };
};

const updateFavorites = (state, payload) => {
  const { data, route } = payload;
  const obj = {};
  obj[route] = [...state.more[route].info];
  const index = obj[route].findIndex(el => el._id === data._id);
  if (index >= 0) obj[route][index] = data;

  return {
    ...state,
    more: {
      albums: { count: state.more.albums.count, info: obj[route] },
      artists: { count: state.more.artists.count, info: obj[route] },
      songs: { count: state.more.songs.count, info: obj[route] }
    }
  };
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_MORE:
      return fetchMore(state, payload);

    case types.FETCH_MORE_START:
      return fetchMoreStart(state, payload);

    case types.FETCH_MORE_END:
      return fetchMoreEnd(state, payload);

    case types.FETCH_LOAD_MORE:
      return fetchLoadMore(state, payload);

    case types.UPDATE_FAVORITES:
      return updateFavorites(state, payload);

    default:
      return state;
  }
}
