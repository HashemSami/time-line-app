import { FC } from "react";
import { ReactComponent as Icon } from "../../../icons/date-icon2.svg";

import { DateIconContainer, DayNameDisplay, DayNumberDisplay } from "./DateIcon.styles";

interface DateIconViewProps {
  dayShortSrting: string;
  dayNumber: number;
  isCurrentDay: boolean;
}

const DateIconView: FC<DateIconViewProps> = ({ dayShortSrting, dayNumber, isCurrentDay }) => {
  return (
    <DateIconContainer isCurrentDay={isCurrentDay}>
      <Icon />
      <DayNameDisplay>{dayShortSrting}</DayNameDisplay>
      <DayNumberDisplay>{dayNumber}</DayNumberDisplay>
    </DateIconContainer>
  );
};

export default DateIconView;
