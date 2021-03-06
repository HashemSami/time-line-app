import { FC } from "react";

import { DateViewerContainer, DateViewerContainer2 } from "./DateViewer.styles";

import dayjs, { DateFunctions } from "../utils/Date";
import { DaysObject } from "../../../models";

import DateIconView from "../date-icon/DateIcon.component";

interface DateViewerProps {
  month: string;
  monthNumber: number;
  weekends: number[];
}

// this component for rendering the month days
const DateViewer: FC<DateViewerProps> = ({ month, monthNumber, weekends }) => {
  const dateContext = DateFunctions();
  // dateContext.setDateContextByYearNumber(2019);
  dateContext.setDateContextByMonthNumber(monthNumber);

  const daysObject = dateContext.getDaysObject({
    weekends: weekends ? weekends : [0, 1],
  });

  console.log(daysObject);

  const renderMonthDays = (daysObject: DaysObject) => {
    const monthDaysElements = Object.keys(daysObject).map(d => {
      const dayInfo = daysObject[d];
      const { dayValue, dayNumber, dayShortSrting, isCurrentDay, isWeekend } =
        dayInfo;
      return (
        <div>
          <DateIconView
            key={dayValue + 500}
            dayShortSrting={dayShortSrting}
            dayNumber={dayNumber}
            isCurrentDay={isCurrentDay}
            isWeekend={isWeekend}
          />
        </div>
      );
    });

    return monthDaysElements;
  };

  // console.log(dateContext.getNextMonth());
  return (
    <DateViewerContainer>
      {dateContext.getMonth()} , {dateContext.getNumberOfDaysInMonth()} days
      {dateContext.getFirstDayOfTheMonth()} {dateContext.getYear()}
      {/* {renderMonthDays(dateContext.getNumberOfDaysInMonth())} */}
      {renderMonthDays(daysObject)}
    </DateViewerContainer>
  );
};

export default DateViewer;
