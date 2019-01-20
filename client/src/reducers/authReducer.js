import * as types from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return action.payload;
    case types.REGISTER:
      return action.payload;

    default:
      return state;
  }
}
