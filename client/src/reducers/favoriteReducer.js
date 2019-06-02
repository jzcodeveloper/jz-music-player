import * as types from "../actions/types";
import { updateObject } from "../utils/utility";

const initialState = {
  favorite: {
    favoriteAlbums: [],
    favoriteArtists: [],
    favoriteSongs: []
  },
  loading: false
};

const fetchFavorites = (state, action) => {
  return updateObject(state, { favorite: action.payload });
};

const fetchFavoritesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchFavoritesEnd = (state, action) => {
  return updateObject(state, { loading: false });
};

const updateFavorites = (state, action) => {
  const payload = action.payload;
  const favoriteAlbums = [...state.favorite.favoriteAlbums];
  const favoriteArtists = [...state.favorite.favoriteArtists];
  const favoriteSongs = [...state.favorite.favoriteSongs];
  const albumIndex = favoriteAlbums.findIndex(e => e._id === payload._id);
  const artistIndex = favoriteArtists.findIndex(e => e._id === payload._id);
  const songIndex = favoriteSongs.findIndex(e => e._id === payload._id);
  if (albumIndex >= 0) favoriteAlbums.splice(albumIndex, 1);
  if (artistIndex >= 0) favoriteArtists.splice(artistIndex, 1);
  if (songIndex >= 0) favoriteSongs.splice(songIndex, 1);

  return updateObject(state, {
    favorite: { favoriteAlbums, favoriteArtists, favoriteSongs }
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FAVORITES:
      return fetchFavorites(state, action);

    case types.FETCH_FAVORITES_START:
      return fetchFavoritesStart(state, action);

    case types.FETCH_FAVORITES_END:
      return fetchFavoritesEnd(state, action);

    case types.UPDATE_FAVORITES:
      return updateFavorites(state, action);

    default:
      return state;
  }
}
