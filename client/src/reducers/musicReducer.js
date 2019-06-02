import * as types from "../actions/types";
import { updateObject } from "../utils/utility";

const initialState = {
  metadata: {
    albumsInfo: [],
    artistsInfo: [],
    songsInfo: []
  },
  loading: false
};

const fetchMetadata = (state, action) => {
  return updateObject(state, { metadata: action.payload });
};

const fetchMetadataStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchMetadataEnd = (state, action) => {
  return updateObject(state, { loading: false });
};

const updateFavorites = (state, action) => {
  const payload = action.payload;
  const albumsInfo = [...state.metadata.albumsInfo];
  const artistsInfo = [...state.metadata.artistsInfo];
  const songsInfo = [...state.metadata.songsInfo];
  const albumIndex = albumsInfo.findIndex(el => el._id === payload._id);
  const artistIndex = artistsInfo.findIndex(el => el._id === payload._id);
  const songIndex = songsInfo.findIndex(el => el._id === payload._id);
  if (albumIndex >= 0) albumsInfo[albumIndex] = payload;
  if (artistIndex >= 0) artistsInfo[artistIndex] = payload;
  if (songIndex >= 0) songsInfo[songIndex] = payload;

  return updateObject(state, {
    metadata: {
      albumsInfo,
      artistsInfo,
      songsInfo
    }
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_METADATA:
      return fetchMetadata(state, action);

    case types.FETCH_METADATA_START:
      return fetchMetadataStart(state, action);

    case types.FETCH_METADATA_END:
      return fetchMetadataEnd(state, action);

    case types.UPDATE_FAVORITES:
      return updateFavorites(state, action);

    default:
      return state;
  }
}
