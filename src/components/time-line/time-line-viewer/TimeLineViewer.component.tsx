import { FC } from "react";
import { months } from "../utils/Date";

import { TimeLineContainer } from "./TimeLineViewer.styles";

import DateViewer from "../date-viewer/DateViewer.component";

const TimeLineViewer: FC = () => {
  return (
    <TimeLineContainer>
      {months.map((month, i) => (
        <DateViewer key={month} month={month} monthNumber={i} />
      ))}
    </TimeLineContainer>
  );
};

export default TimeLineViewer;
