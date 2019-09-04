import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export function initializeStore() {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware()));
}
