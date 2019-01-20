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
        ...state,
        metadata: action.payload
      };

    default:
      return state;
  }
}
