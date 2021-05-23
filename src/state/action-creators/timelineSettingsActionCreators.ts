import { TimelineSettingsActionTypes } from "../action-types";

import { TimeLineSettingsActions } from "../actions";

export const setWeekendDays = (weekends: number[]): TimeLineSettingsActions => {
  return { type: TimelineSettingsActionTypes.SET_WEEKEND_DAYS, payload: weekends };
};
