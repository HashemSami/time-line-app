import { TimelineSettingsActionTypes } from "../action-types";
import { TimeLineSettingsActions } from "../actions";

interface TimelineSettingsState {
  weekEnds: number[];
}

const initialState: TimelineSettingsState = { weekEnds: [0, 1] };

const timelineSettingsReducer = (state: TimelineSettingsState = initialState, action: TimeLineSettingsActions): TimelineSettingsState => {
  switch (action.type) {
    case TimelineSettingsActionTypes.SET_WEEKEND_DAYS:
      return { ...state, weekEnds: action.payload };
    default:
      return state;
  }
};

export default timelineSettingsReducer;
