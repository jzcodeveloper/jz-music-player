import * as types from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  expiresIn: localStorage.getItem("expiresIn"),
  isAuthenticated: false,
  user: null
};

const setCurrentUser = (state, payload) => {
  return { ...state, isAuthenticated: true, user: payload };
};

const setState = (state, payload) => {
  localStorage.setItem("token", payload.token);
  localStorage.setItem("expiresIn", payload.expiresIn);
  return { ...state, isAuthenticated: true, ...payload };
};

const resetState = (state, payload) => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
  return { ...state, expiresIn: 0, isAuthenticated: false, token: null };
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_CURRENT_USER:
      return setCurrentUser(state, payload);

    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      return setState(state, payload);

    case types.LOGIN_FAIL:
    case types.REGISTER_FAIL:
    case types.AUTH_ERROR:
    case types.LOGOUT:
      return resetState(state, payload);

    default:
      return state;
  }
}
