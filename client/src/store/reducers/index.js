import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import authReducer from "./authReducer";
import playerReducer from "./playerReducer";
import musicReducer from "./musicReducer";
import moreReducer from "./moreReducer";
import favoriteReducer from "./favoriteReducer";
import countReducer from "./countReducer";
import playlistsReducer from './playlistsReducer'

export default combineReducers({
  errors: errorsReducer,
  auth: authReducer,
  player: playerReducer,
  music: musicReducer,
  more: moreReducer,
  favorite: favoriteReducer,
  count: countReducer,
  playlists:playlistsReducer
});
