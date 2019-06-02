import axios from "axios";
import { setErrors } from "./errorsActions";
import { setAuthToken } from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import * as types from "./types";

export const login = (payload, history) => dispatch => {
  axios
    .post("/auth/login", payload)
    .then(res => {
      const { token } = res.data;
      const decoded = jwt_decode(token);
      localStorage.setItem("Authorization", token);
      setAuthToken(token);
      dispatch(setCurrentUser(decoded));
      dispatch(setErrors());
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch(setErrors(err.response.data));
    });
};

export const register = (payload, history) => dispatch => {
  axios
    .post("/auth/register", payload)
    .then(res => {
      history.push("/login");
      dispatch(setErrors());
    })
    .catch(err => {
      dispatch(setErrors(err.response.data));
    });
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("Authorization");
  setAuthToken(false);
  dispatch(setCurrentUser());
};

export const checkAuthState = history => dispatch => {
  if (localStorage.Authorization) {
    const decoded = jwt_decode(localStorage.Authorization);
    const currentTime = Date.now() / 1000;
    if (decoded.exp <= currentTime) {
      dispatch(logoutUser(history));
    } else {
      setAuthToken(localStorage.Authorization);
      dispatch(setCurrentUser(decoded));
    }
  } else {
    dispatch(logoutUser(history));
  }
};

export const setCurrentUser = (payload = {}) => {
  return {
    type: types.SET_CURRENT_USER,
    payload
  };
};
