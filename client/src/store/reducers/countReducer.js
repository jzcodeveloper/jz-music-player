import * as types from "../actions/types";

const initialState = {
  count: 0
};

const countSongs = (state, payload) => {
  return { count: payload };
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.COUNT_SONGS:
      return countSongs(state, payload);

    default:
      return state;
  }
}
