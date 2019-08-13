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

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_METADATA:
      return fetchMetadata(state, payload);

    case types.FETCH_METADATA_START:
      return fetchMetadataStart(state, payload);

    case types.FETCH_METADATA_END:
      return fetchMetadataEnd(state, payload);

    default:
      return state;
  }
}
