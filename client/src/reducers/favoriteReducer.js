import * as types from "../actions/types";

const initialState = {
  favorite: {
    favoriteAlbums: [],
    favoriteArtists: [],
    favoriteSongs: []
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FAVORITES:
      return {
        favorite: action.payload
      };
    case types.UPDATE_FAVORITES:
      const payload = action.payload;
      const favoriteAlbums = state.favorite.favoriteAlbums.slice();
      const favoriteArtists = state.favorite.favoriteArtists.slice();
      const favoriteSongs = state.favorite.favoriteSongs.slice();
      const albumIndex = favoriteAlbums.findIndex(e => e._id === payload._id);
      const artistIndex = favoriteArtists.findIndex(e => e._id === payload._id);
      const songIndex = favoriteSongs.findIndex(e => e._id === payload._id);
      if (albumIndex >= 0) favoriteAlbums.splice(albumIndex, 1);
      if (artistIndex >= 0) favoriteArtists.splice(artistIndex, 1);
      if (songIndex >= 0) favoriteSongs.splice(songIndex, 1);

      return {
        favorite: {
          favoriteAlbums,
          favoriteArtists,
          favoriteSongs
        }
      };

    default:
      return state;
  }
}
