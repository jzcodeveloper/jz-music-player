import * as types from "../actions/types";
import { isEmpty, updateObject } from "../utils/utility";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const setCurrentUser = (state, action) => {
  return updateObject(state, {
    isAuthenticated: !isEmpty(action.payload),
    user: action.payload
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return setCurrentUser(state, action);

    default:
      return state;
  }
}
