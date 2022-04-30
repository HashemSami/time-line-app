import { FC, useEffect, useRef, useState } from "react";

import { ProgressChartContainer, TitleContainer } from "./ProgressChart.styles";
import { ReactComponent as Icon } from "../../../icons/target.svg";

import { d3Chart } from "./d3-chart";
import { TimelineWindowProps } from "../../../models/TimelineWindow";

interface MapProps {
  width: number;
  height: number;
}

const ProgressChart: FC<TimelineWindowProps> = ({
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

    const kpiChart = d3Chart(chartDiv.current, width, height).progressChart();

    // const timelineWindow = barChart.barChart();

    kpiChart.updateData([{ name: "KPI", value: 600, target: 1000 }]);
    // timelineWindow.updateData(timeLineData, [
    //   dateContext.getFirstDateOfTheYear(),
    //   dateContext.getLastDateOfTheYear(),
    // ]);

    // updateFunction(barChart);
    // setBarC(barChart);
  }, []);

  return (
    <>
      <TitleContainer>
        <Icon />
        <p>Target Achievement</p>
      </TitleContainer>
      <ProgressChartContainer
        ref={chartDiv}
        width={width}
        height={height}
      ></ProgressChartContainer>
    </>
  );
};

export default ProgressChart;
