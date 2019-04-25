import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

let composeEnhancers =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| null;
if (!composeEnhancers) composeEnhancers = compose;

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
