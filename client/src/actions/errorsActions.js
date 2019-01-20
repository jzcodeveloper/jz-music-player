import * as types from "./types";

export const setErrors = (payload = {}) => {
  return {
    type: types.SET_ERRORS,
    payload
  };
};
