import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import logger from "redux-logger";

const middelwares = [logger, thunk];

export const store = createStore(reducers, {}, applyMiddleware(...middelwares));
