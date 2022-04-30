import { FC, useEffect, useRef, useState } from "react";

import { KpiChartContainer } from "./KpiChart.styles";

import { d3Chart } from "./d3-chart";
import { TimelineWindowProps } from "../../../models/TimelineWindow";

interface MapProps {
  width: number;
  height: number;
}

const KpiChart: FC<TimelineWindowProps> = ({
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

    const kpiChart = d3Chart(chartDiv.current, width, height).kpiChart();

    // const timelineWindow = barChart.barChart();

    kpiChart.updateData([{ name: "KPI", count: 88, order: 1 }]);
    // timelineWindow.updateData(timeLineData, [
    //   dateContext.getFirstDateOfTheYear(),
    //   dateContext.getLastDateOfTheYear(),
    // ]);

    // updateFunction(barChart);
    // setBarC(barChart);
  }, []);

  return (
    <KpiChartContainer
      ref={chartDiv}
      width={width}
      height={height}
    ></KpiChartContainer>
  );
};

export default KpiChart;
