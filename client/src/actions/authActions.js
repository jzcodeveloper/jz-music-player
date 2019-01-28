import axios from "axios";
import { setErrors } from "./errorsActions";
import { setAuthToken } from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import * as types from "./types";

export const login = payload => dispatch => {
  axios
    .post("/auth/login", payload)
    .then(res => {
      //Get token
      const { token } = res.data;
      //Store in ls
      localStorage.setItem("Authorization", token);
      //Set axios header
      setAuthToken(token);
      //Decode token
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(setErrors());
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

export const logoutUser = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem("Authorization");
  //Remove auth header for future requests
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser());
};

export const setCurrentUser = (payload = {}) => {
  return {
    type: types.SET_CURRENT_USER,
    payload
  };
};
