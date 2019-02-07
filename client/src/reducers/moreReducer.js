import * as types from "../actions/types";

const initialState = {
  more: {
    albums: { count: 0, info: [] },
    artists: { count: 0, info: [] },
    songs: { count: 0, info: [] }
  }
};

export default function(state = initialState, action) {
  let more;
  switch (action.type) {
    case types.FETCH_MORE:
      more = JSON.parse(JSON.stringify(state.more));
      more[action.pathname].info = action.payload.info;
      more[action.pathname].count = action.payload.count;
      return {
        more
      };
    case types.FETCH_LOAD_MORE:
      more = JSON.parse(JSON.stringify(state.more));
      more[action.pathname].info = [
        ...state.more[action.pathname].info,
        ...action.payload.info
      ];
      more[action.pathname].count = action.payload.count;
      return {
        more
      };
    case types.UPDATE_FAVORITES:
      const payload = action.payload;
      const albums = state.more.albums.info.slice();
      const artists = state.more.artists.info.slice();
      const songs = state.more.songs.info.slice();
      const albumIndex = albums.findIndex(el => el._id === payload._id);
      const artistIndex = artists.findIndex(el => el._id === payload._id);
      const songIndex = songs.findIndex(el => el._id === payload._id);
      if (albumIndex >= 0) albums[albumIndex] = payload;
      if (artistIndex >= 0) artists[artistIndex] = payload;
      if (songIndex >= 0) songs[songIndex] = payload;

      return {
        more: {
          albums: { count: state.more.albums.count, info: albums },
          artists: { count: state.more.artists.count, info: artists },
          songs: { count: state.more.songs.count, info: songs }
        }
      };

    default:
      return state;
  }
}
