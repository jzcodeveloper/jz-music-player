import axios from "../axios";
import { setAuthToken } from "../../utils/setAuthToken";
import * as types from "./types";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const { data } = await axios.get("/auth/user");
    dispatch({ type: types.SET_CURRENT_USER, payload: data });
  } catch (err) {
    dispatch({ type: types.AUTH_ERROR });
  }
};

export const login = payload => async dispatch => {
  try {
    const { data } = await axios.post("/auth/login", payload);
    dispatch({ type: types.LOGIN_SUCCESS, payload: data });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL });
    dispatch({ type: types.SET_ERRORS, payload: error.response.data });
  }
};

export const register = payload => async dispatch => {
  try {
    const { data } = await axios.post("/auth/register", payload);
    dispatch({ type: types.REGISTER_SUCCESS, payload: data });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: types.REGISTER_FAIL });
    dispatch({ type: types.SET_ERRORS, payload: error.response.data });
  }
};

export const checkAuthState = () => dispatch => {
  const { token, expiresIn } = localStorage;

  if (token) {
    const currentTime = Date.now() / 1000;

    if (expiresIn <= currentTime) {
      dispatch(logoutUser());
    } else {
      dispatch(loadUser());
    }
  } else {
    dispatch(logoutUser());
  }
};

export const logoutUser = () => dispatch => {
  dispatch({ type: types.LOGOUT });
};
