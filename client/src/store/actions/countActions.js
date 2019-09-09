import axios from "../axios";
import * as types from "./types";

export const countSongs = () => async dispatch => {
  try {
    const { data } = await axios.get("/metadata/count/songs");
    dispatch({ type: types.COUNT_SONGS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
