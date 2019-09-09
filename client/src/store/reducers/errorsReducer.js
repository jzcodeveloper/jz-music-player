import * as types from "../actions/types";

const initialState = {};

const setErrors = (state, payload = {}) => {
  return payload;
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_ERRORS:
      return setErrors(state, payload);

    default:
      return state;
  }
}
