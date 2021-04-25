export interface DayObject {
  [day: string]: { dayNumber: number; dayValue: number; dayString: string; dayShortSrting: string; monthName: string; year: number; isCurrentDay: boolean };
}
