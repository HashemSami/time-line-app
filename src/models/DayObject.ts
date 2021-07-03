export interface DaysObject {
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
    jsDate: Date;
  };
}

export interface TimelineData {
  [year: string]: { [month: string]: DaysObject };
}
