import * as types from "../actions/types";

const initialState = {
  more: {
    count: 0,
    info: []
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MORE:
      return {
        ...state,
        more: action.payload
      };
    case types.FETCH_LOAD_MORE:
      return {
        ...state,
        more: {
          count: action.payload.count,
          info: [...state.more.info, ...action.payload.info]
        }
      };

    default:
      return state;
  }
}
