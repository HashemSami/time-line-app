import {
  linearScale,
  bandScale,
  getMaxValue,
  generateBarXAxis,
  generateBarYAxis,
  getMinValue,
} from "../../../../services/d3";
import { ChartOptions } from "./models";
// import { generateValueTip } from "../../../tooltips/chartsToolTips/valueTips";

export const progressChart = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  chartOptions: ChartOptions
) => {
  const { width, height, margin } = chartOptions;

  // // generates axis labels
  // const ChartTitle = svg
  //   .append("text")
  //   .attr("class", "chart_title")
  //   .attr("x", 0)
  //   .attr("y", -margin.top / 2);
  // // .attr("text-anchor", "middle");

  // const ChartLeftLabel = svg
  //   .append("text")
  //   .attr("x", -(height / 2))
  //   .attr("y", -(margin.left / 2))
  //   .attr("text-anchor", "middle")
  //   // rotating the text will also rotate the x and the y axis
  //   // that are belong to the text
  //   .attr("transform", "rotate(-90)");

  const targetRect = svg
    .append("g")
    .append("rect")
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  const valueRect = svg.append("g");

  // const xAxisSvg = svg.append("g").attr("transform", `translate(0, ${height})`);

  // const yAxisSvg = svg.append("g");

  return {
    updateData: (
      newData: { name: string; value: number; target: number }[]
    ) => {
      // ChartTitle.text("Target Achievement:");
      // ChartLeftLabel.text("Axis Title");
      // ------------------------------------------------------------
      // xAxis
      // will also do the scaling for the x values (the fields names)
      const y = bandScale(
        newData.map((d) => d.name),
        [0, height + 30]
      );
      y.padding(0.5);

      // const xAxisCall = generateBarXAxis()(x);

      const rectWidth = y.bandwidth() / 2;

      // xAxisSvg.call(xAxisCall);

      // ------------------------------------------------------------
      // yAxis
      const max = getMaxValue(newData);
      const min = getMinValue(newData);

      const x = linearScale([0, newData[0].target], [0, width]);

      // DATA JOIN
      const yVal = y(newData[0].name);
      targetRect
        .attr("y", yVal ? yVal : 0)
        .attr("x", 0)
        .attr("width", x(newData[0].target))
        .attr("height", rectWidth);

      const rects = valueRect.selectAll("rect").data(newData);

      // EXIT
      rects
        .exit()
        .transition()
        .duration(500)
        .attr("y", width)
        .attr("height", 0)
        .remove();

      // UPDATE

      // xAxisSvg.transition().duration(500).call(xAxisCall);
      // yAxisSvg.transition().duration(500).call(yAxisCall);

      rects
        .attr("y", (data, i) => {
          const yVal = y(data.name);
          return yVal ? yVal : null;
        })
        .attr("x", 0)
        .attr("width", (d) => width - x(d.value))
        .attr("height", rectWidth);

      // adding to the enter() phase
      // ENTER
      rects
        .enter()
        .append("rect")
        .on("mousemove", (e, d) => {
          // e.target.style.fill = "yellow";
        })
        .on("mouseout", (e, d) => {
          // e.target.style.fill = "red";
        })
        .attr("y", (data, i) => {
          const yVal = y(data.name);
          return yVal ? yVal : null;
        })
        .attr("width", (d) => x(d.value))
        .attr("fill", "cadetblue")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("x", 0)
        .attr("height", rectWidth)
        .each((d) => {
          const yVal = y(d.name) || 0;
          const xVal = x(d.value);

          svg
            .append("polygon")
            .attr(
              "points",
              `${xVal},${yVal} ${xVal - 20},${yVal + 20} ${xVal - 10},${
                yVal + 20
              } ${xVal - 10},${yVal + 25} ${xVal + 10},${yVal + 25}  ${
                xVal + 10
              },${yVal + 20} ${xVal + 20},${yVal + 20}`
            )
            .attr("fill", "url(#KPIGradient)")
            .attr("stroke", "black")
            .attr("class", "arrow_icon")
            .attr("stroke-width", 2);

          svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", xVal)
            .attr("y", yVal - 25)
            .attr("class", "wells_value")
            .text(`${d.value}`);

          svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", xVal)
            .attr("y", yVal - 5)
            .attr("class", "wells_value")
            .text(`wells`);
          // .attr("r", 10);
        });
    },
  };
};
