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

    default:
      return state;
  }
}
