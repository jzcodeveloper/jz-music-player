import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import loadingReducer from "./loadingReducer";
import authReducer from "./authReducer";
import playerReducer from "./playerReducer";
import musicReducer from "./musicReducer";
import moreReducer from "./moreReducer";
import favoriteReducer from "./favoriteReducer";

export default combineReducers({
  errors: errorsReducer,
  loading: loadingReducer,
  auth: authReducer,
  player: playerReducer,
  music: musicReducer,
  more: moreReducer,
  favorite: favoriteReducer
});
