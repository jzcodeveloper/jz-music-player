import * as types from "../actions/types";
import { updateObject } from "../utils/utility";

const initialState = {
  count: 0
};

const countSongs = (state, action) => {
  return updateObject(state, { count: action.payload });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.COUNT_SONGS:
      return countSongs(state, action);

    default:
      return state;
  }
}
