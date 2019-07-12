import * as types from "../actions/types";

const initialState = {
  metadata: {
    albumsInfo: [],
    artistsInfo: [],
    songsInfo: []
  },
  loading: true
};

const fetchMetadata = (state, payload) => {
  return { ...state, metadata: payload };
};

const fetchMetadataStart = (state, payload) => {
  return { ...state, loading: true };
};

const fetchMetadataEnd = (state, payload) => {
  return { ...state, loading: false };
};

const updateFavorites = (state, payload) => {
  const { data, route } = payload;
  const key = `${route}Info`;
  const obj = {};
  obj[key] = [...state.metadata[key]];
  const index = obj[key].findIndex(el => el._id === data._id);
  if (index >= 0) obj[key][index] = data;

  return {
    ...state,
    metadata: {
      ...state.metadata,
      [key]: obj[key]
    }
  };
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_METADATA:
      return fetchMetadata(state, payload);

    case types.FETCH_METADATA_START:
      return fetchMetadataStart(state, payload);

    case types.FETCH_METADATA_END:
      return fetchMetadataEnd(state, payload);

    case types.UPDATE_FAVORITES:
      return updateFavorites(state, payload);

    default:
      return state;
  }
}
