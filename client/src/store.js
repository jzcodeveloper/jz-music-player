import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//To hide store from being shown in redux dev-tools in production
/*const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;*/

//To show store in redux dev-tools in production
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || null;
if (!composeEnhancers) composeEnhancers = compose;

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
