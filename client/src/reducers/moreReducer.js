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
    case types.UPDATE_FAVORITES:
      const payload = action.payload;
      const info = state.more.info.slice();
      const infoIndex = info.findIndex(el => el._id === payload._id);
      if (infoIndex >= 0) info[infoIndex] = payload;
      return {
        more: {
          count: state.more.count,
          info
        }
      };

    default:
      return state;
  }
}
