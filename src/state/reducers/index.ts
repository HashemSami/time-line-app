import { combineReducers } from "redux";

import timeLineSettingsReducer from "./timeLineSettingsReducer";

const reducers = combineReducers({
  timeLineSettings: timeLineSettingsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
