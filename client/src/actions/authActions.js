import axios from "axios";
import { setErrors } from "./errorsActions";
import * as types from "./types";

export const login = payload => dispatch => {
  axios
    .post("/auth/login", payload)
    .then(res => {
      dispatch(loginSync(res.data));
      dispatch(setErrors());
    })
    .catch(err => {
      dispatch(setErrors(err.response.data));
    });
};

export const loginSync = payload => {
  return {
    type: types.LOGIN,
    payload
  };
};

export const register = payload => dispatch => {
  axios
    .post("/auth/register", payload)
    .then(res => {
      dispatch(registerSync(res.data));
      dispatch(setErrors());
    })
    .catch(err => {
      dispatch(setErrors(err.response.data));
    });
};

export const registerSync = payload => {
  return {
    type: types.REGISTER,
    payload
  };
};
