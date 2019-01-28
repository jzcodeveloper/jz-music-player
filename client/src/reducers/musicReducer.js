import * as types from "../actions/types";

const initialState = {
  metadata: {
    albumsInfo: [],
    artistsInfo: [],
    songsInfo: []
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_METADATA:
      return {
        metadata: action.payload
      };
    case types.UPDATE_FAVORITES:
      const payload = action.payload;
      const albumsInfo = state.metadata.albumsInfo.slice();
      const artistsInfo = state.metadata.artistsInfo.slice();
      const songsInfo = state.metadata.songsInfo.slice();
      const albumIndex = albumsInfo.findIndex(el => el._id === payload._id);
      const artistIndex = artistsInfo.findIndex(el => el._id === payload._id);
      const songIndex = songsInfo.findIndex(el => el._id === payload._id);
      if (albumIndex >= 0) albumsInfo[albumIndex] = payload;
      if (artistIndex >= 0) artistsInfo[artistIndex] = payload;
      if (songIndex >= 0) songsInfo[songIndex] = payload;

      return {
        metadata: {
          albumsInfo,
          artistsInfo,
          songsInfo
        }
      };

    default:
      return state;
  }
}
