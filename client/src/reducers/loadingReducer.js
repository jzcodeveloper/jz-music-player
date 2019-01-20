import * as types from "../actions/types";

const initialState = {
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.START_LOADING:
      return {
        loading: true
      };
    case types.END_LOADING:
      return {
        loading: false
      };

    default:
      return state;
  }
}
