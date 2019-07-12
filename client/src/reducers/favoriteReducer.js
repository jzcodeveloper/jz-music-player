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
  const { data, route } = payload;
  const firstLetter = route.charAt(0).toUpperCase();
  const rest = route.slice(1);
  const key = `favorite${firstLetter}${rest}`;
  const obj = {};
  obj[key] = [...state.favorite[key]];
  const index = obj[key].findIndex(el => el._id === data._id);
  if (index >= 0) obj[key].splice(index, 1);

  return {
    ...state,
    favorite: {
      ...state.favorite,
      [key]: obj[key]
    }
  };
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
