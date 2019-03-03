import * as types from "../actions/types";
import { isEmpty } from "../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
}
