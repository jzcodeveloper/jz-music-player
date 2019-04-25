import * as types from "../actions/types";

const initialState = {
  metadata: {
    albumsInfo: [],
    artistsInfo: [],
    songsInfo: []
  },
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_METADATA: {
      return {
        ...state,
        metadata: action.payload
      };
    }
    case types.FETCH_METADATA_START: {
      return {
        ...state,
        loading: true
      };
    }
    case types.FETCH_METADATA_END: {
      return {
        ...state,
        loading: false
      };
    }
    case types.UPDATE_FAVORITES: {
      const payload = action.payload;
      const albumsInfo = state.metadata.albumsInfo.slice();
      const artistsInfo = state.metadata.artistsInfo.slice();
      const songsInfo = state.metadata.songsInfo.slice();
      const albumIndex = albumsInfo.findIndex(el => el._id === payload._id);
      const artistIndex = artistsInfo.findIndex(el => el._id === payload._id);
      const songIndex = songsInfo.findIndex(el => el._id === payload._id);
      if (albumIndex > -1) albumsInfo[albumIndex] = payload;
      if (artistIndex > -1) artistsInfo[artistIndex] = payload;
      if (songIndex > -1) songsInfo[songIndex] = payload;

      return {
        ...state,
        metadata: {
          albumsInfo,
          artistsInfo,
          songsInfo
        }
      };
    }
    case types.DELETE_SONG: {
      const albumsInfo = state.metadata.albumsInfo.slice();
      const artistsInfo = state.metadata.artistsInfo.slice();
      const songsInfo = state.metadata.songsInfo.slice();
      const albumIndex = albumsInfo.findIndex(el => el._id === action.payload);
      const artistIndex = artistsInfo.findIndex(
        el => el._id === action.payload
      );
      const songIndex = songsInfo.findIndex(el => el._id === action.payload);
      if (albumIndex >= 0) albumsInfo.splice(albumIndex, 1);
      if (artistIndex >= 0) artistsInfo.splice(artistIndex, 1);
      if (songIndex >= 0) songsInfo.splice(songIndex, 1);

      return {
        ...state,
        metadata: {
          albumsInfo,
          artistsInfo,
          songsInfo
        }
      };
    }

    default:
      return state;
  }
}
