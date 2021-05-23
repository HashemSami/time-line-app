import { TimelineSettingsActionTypes } from "../action-types";

interface SetWeekendDays {
  type: TimelineSettingsActionTypes.SET_WEEKEND_DAYS;
  payload: number[];
}

export type TimeLineSettingsActions = SetWeekendDays;
