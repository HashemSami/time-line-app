import { FC, useEffect, useRef, useState } from "react";

import { BarChartContainer } from "./SideBarChart.styles";

import { d3Chart } from "./d3-chart";
import { TimelineWindowProps } from "../../../models/TimelineWindow";

interface MapProps {
  width: number;
  height: number;
}

const SideBarChart: FC<TimelineWindowProps> = ({
  width,
  height,
  updateFunction,
}) => {
  const chartDiv = useRef<HTMLDivElement | null>(null);

  const [barC, setBarC] = useState<any>();

  useEffect(() => {
    if (!chartDiv.current) {
      return;
    }

    const barChart = d3Chart(chartDiv.current, width, height).barChart();

    // const timelineWindow = barChart.barChart();

    barChart.updateData([
      { name: "building", value: 33 },
      { name: "landing", value: 50 },
      { name: "Geosteering", value: 20 },
      { name: "Pilot Geometric", value: 40 },
      { name: "Rig Operation", value: 80 },
    ]);
    // timelineWindow.updateData(timeLineData, [
    //   dateContext.getFirstDateOfTheYear(),
    //   dateContext.getLastDateOfTheYear(),
    // ]);

    // updateFunction(barChart);
    // setBarC(barChart);
  }, []);

  return (
    <BarChartContainer
      ref={chartDiv}
      width={width}
      height={height}
    ></BarChartContainer>
  );
};

export default SideBarChart;

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
