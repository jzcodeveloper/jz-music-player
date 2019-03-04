import axios from "axios";
import * as types from './types'

export const deleteSong = (route, id) => dispatch => {
  axios
    .delete(`/${route}/${id}`)
    .then(res => dispatch(deleteSongSync(id)))
    .catch(err => {});
};

export const deleteSongSync = payload => {
  return {
    type: types.DELETE_SONG,
    payload
  };
};
