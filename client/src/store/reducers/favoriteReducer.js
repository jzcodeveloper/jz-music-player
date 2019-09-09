import * as types from "../actions/types";

const initialState = {
  favorite: {
    favoriteAlbums: [],
    favoriteArtists: [],
    favoriteSongs: []
  },
  loading: true
};

const fetchFavorites = (state, payload) => {
  return { ...state, favorite: payload };
};

const fetchFavoritesStart = (state, payload) => {
  return { ...state, loading: true };
};

const fetchFavoritesEnd = (state, payload) => {
  return { ...state, loading: false };
};

const updateFavorites = (state, payload) => {
  const key = `favorite${payload.model}`;
  const favorite = { ...state.favorite };
  const index = favorite[key].findIndex(el => el._id === payload.id);
  if (index > -1) favorite[key].splice(index, 1);
  return { ...state, favorite };
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_FAVORITES:
      return fetchFavorites(state, payload);

    case types.FETCH_FAVORITES_START:
      return fetchFavoritesStart(state, payload);

    case types.FETCH_FAVORITES_END:
      return fetchFavoritesEnd(state, payload);

    case types.UPDATE_FAVORITES:
      return updateFavorites(state, payload);

    default:
      return state;
  }
}
