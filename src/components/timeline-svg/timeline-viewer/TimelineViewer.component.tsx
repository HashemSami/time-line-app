import { FC } from "react";
import { months } from "../utils/Date";

import { TimelineContainer } from "./TimelineViewer.styles";

import { useTypedSelector } from "../../../hooks/useTypedSelectors";

import DateViewer from "../date-viewer/DateViewer.component";

const TimeLineViewer: FC = () => {
  const weekends = useTypedSelector(({ timeLineSettings: { weekEnds } }) => weekEnds);

  return (
    <TimelineContainer>
      {months.map((month, i) => (
        <DateViewer key={month} month={month} monthNumber={i} weekends={weekends} />
      ))}
    </TimelineContainer>
  );
};

export default TimeLineViewer;
