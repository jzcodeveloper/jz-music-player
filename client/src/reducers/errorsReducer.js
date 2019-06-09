import * as types from "../actions/types";
import { updateObject } from "../utils/utility";

const initialState = {};

const setErrors = (state, action) => {
  return updateObject({}, action.payload);
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_ERRORS:
      return setErrors(state, action);

    default:
      return state;
  }
}
