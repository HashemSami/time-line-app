export interface DayObject {
  [day: string]: {
    dayIndex: number;
    dayNumber: number;
    dayValue: number;
    dayString: string;
    dayShortSrting: string;
    monthName: string;
    year: number;
    isCurrentDay: boolean;
    isWeekend: boolean;
  };
}

export interface TimelineData {
  [year: string]: { [month: string]: DayObject };
}
