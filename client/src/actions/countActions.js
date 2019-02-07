import axios from "axios";
import * as types from "./types";

export const countSongs = () => dispatch => {
  axios
    .get("/count/songs")
    .then(res => dispatch(countSongsSync(res.data)))
    .catch(err => {});
};

export const countSongsSync = payload => {
  return {
    type: types.COUNT_SONGS,
    payload
  };
};
