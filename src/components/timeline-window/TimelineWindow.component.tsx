import { FC, useEffect, useRef, useState } from "react";

import { months, DateFunctions } from "./utils/Date";

import { TimelineWindowContainer } from "./TimelineWindow.styles";

import { useTypedSelector } from "../../hooks/useTypedSelectors";

import { d3Timeline } from "./d3-timeline";
import { TimelineWindowProps, TimelineData } from "../../models";

interface MapProps {
  width: number;
  height: number;
}

const dateContext = DateFunctions();

var yearDays = new Date().getFullYear() % 4 === 0 ? 366 : 365;

const TimelineWindow: FC<TimelineWindowProps> = ({
  width,
  height,
  updateFunction,
}) => {
  const chartDiv = useRef<HTMLDivElement | null>(null);

  const [barC, setBarC] = useState<any>();

  const generateYearData = () => {
    const timeLineData: TimelineData = {};

    for (let i = 0; i < yearDays; i++) {}

    // dateContext.setDateContextByYearNumber(2019);
    const year = dateContext.getYear();

    months.forEach((month, i) => {
      dateContext.setDateContextByMonthNumber(i);

      const daysObject = dateContext.getDaysObject();

      Object.assign(timeLineData, {
        [`${year}`]: {
          [i]: Object.keys(daysObject).map(
            dateString => daysObject[dateString]
          ),
          ...timeLineData[`${year}`],
        },
      });
    });

    console.log(timeLineData);
    return timeLineData;
  };

  useEffect(() => {
    if (!chartDiv.current) {
      return;
    }

    const timeLineData = generateYearData();

    const chart = d3Timeline(chartDiv.current, width, height);

    const timelineWindow = chart.timeLineWindow();
    timelineWindow.updateData(timeLineData, [
      dateContext.getFirstDateOfTheYear(),
      dateContext.getLastDateOfTheYear(),
    ]);

    // updateFunction(barChart);
    // setBarC(barChart);
  }, []);

  return (
    <TimelineWindowContainer
      ref={chartDiv}
      width={width}
      height={height}
    ></TimelineWindowContainer>
  );
};

export default TimelineWindow;

// const TimeLineViewer: FC = () => {
//   const weekends = useTypedSelector(({ timeLineSettings: { weekEnds } }) => weekEnds);

//   return (
//     <TimelineWindowContainer>
//       {months.map((month, i) => (
//         <DateViewer key={month} month={month} monthNumber={i} weekends={weekends} />
//       ))}
//     </TimelineWindowContainer>
//   );
// };
