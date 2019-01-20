import * as types from "./types";

export const startLoading = () => {
  return {
    type: types.START_LOADING
  };
};

export const endLoading = () => {
  return {
    type: types.END_LOADING
  };
};
