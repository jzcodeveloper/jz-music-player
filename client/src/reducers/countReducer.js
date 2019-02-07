import * as types from "../actions/types";

const initialState = {
  count:0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.COUNT_SONGS:
      return {
        count:action.payload
      };

    default:
      return state;
  }
}
