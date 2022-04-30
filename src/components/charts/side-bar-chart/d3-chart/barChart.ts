import {
  linearScale,
  bandScale,
  getMaxValue,
  generateBarXAxis,
  generateBarYAxis,
  getMinValue,
} from "../../../../services/d3";
import * as d3 from "d3";
import { ChartOptions } from "./models";
import { wellTypeCollors } from "../../../../styles/colors";
// import { generateValueTip } from "../../../tooltips/chartsToolTips/valueTips";

export const barChart = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  chartOptions: ChartOptions
) => {
  const { width, height, margin } = chartOptions;

  // generates axis labels
  const ChartTitle = svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle");

  const ChartLeftLabel = svg
    .append("text")
    .attr("x", -(height / 2))
    .attr("y", -(margin.left / 2))
    .attr("text-anchor", "middle")
    // rotating the text will also rotate the x and the y axis
    // that are belong to the text
    .attr("transform", "rotate(-90)");

  const color = d3
    .scaleOrdinal<string>()
    .domain([
      "Building",
      "Landing",
      "Geosteering",
      "Pilot Geometric",
      "Rig Operation",
    ])
    .range([
      wellTypeCollors.building,
      wellTypeCollors.landing,
      wellTypeCollors.geosteering,
      wellTypeCollors.pilot,
      wellTypeCollors.rigOperation,
    ]);

  // we need to call our xAxis generator on our svg
  // but we need to append them to a group to make both axis
  // show on the screen, and add the transform to move it to the bottom
  // of the canvas
  const xAxisSvg = svg.append("g").attr("transform", `translate(0, ${height})`);

  const yAxisSvg = svg.append("g");

  // const tip = generateValueTip(svg, -10);

  return {
    updateData: (newData: { name: string; value: number }[]) => {
      ChartTitle.text("Active Wells");
      // ChartLeftLabel.text("Axis Title");
      // ------------------------------------------------------------
      // xAxis
      // will also do the scaling for the x values (the fields names)
      const y = bandScale(
        newData.map((d) => d.name),
        [0, height]
      );
      y.padding(0.5);

      const yAxisCall = generateBarYAxis()(y);

      const midPoint = y.bandwidth() / 2;

      // xAxisSvg.call(xAxisCall);

      // ------------------------------------------------------------
      // yAxis
      const max = getMaxValue(newData);
      const min = getMinValue(newData);
      // here we will set the scale of our bar chart to fit all the data into
      // our visulaization
      const x = linearScale(
        [min ? min * 0.95 : 0, max ? max + 10 : 1000],
        [0, width]
      );

      const xAxisCall = generateBarXAxis()(x);
      // we need to call our yAxis generator on our svg
      // but we need to append them to a group to make both axis
      // show on the screen

      // ------------------------------------------------------------
      // ------------------------------------------------------------
      // draw rects
      // we can use d3 selectAll method to add visulizaion to our data
      // instead of looping through all the data with for each
      // after adding the data to the SVG, we can save it in a variable.

      // DATA JOIN
      const rects = svg.selectAll("rect").data(newData);
      // once you set your data using the data() method, you can have access to all the data
      // and the data eteration number in inside the attributes setters as a function
      // console.log(x("Hashem"));
      // console.log(x.bandwidth());

      // EXIT
      rects
        .exit()
        .transition()
        .duration(500)
        .attr("y", height)
        .attr("height", 0)
        .remove();

      // UPDATE

      xAxisSvg.transition().duration(500).call(xAxisCall);

      yAxisSvg
        .transition()
        .duration(500)
        .call(yAxisCall)
        .selectAll("text")
        .attr("style", "transform:rotate(-40deg) translate(5px, -10px);");
      // .attr("style", "translate(30px, 20px) rotate(20deg);");

      rects
        .transition()
        .duration(500)
        .attr("y", (data, i) => {
          const yVal = y(data.name);
          return yVal ? yVal : null;
        })
        .attr("x", (d) => x(d.value))
        .attr("width", (d) => x(d.value))
        .attr("height", y.bandwidth());

      // adding to the enter() phase
      // ENTER
      rects
        .enter()
        .append("rect")
        .on("mousemove", (e, d) => {
          e.target.style.fill = "yellow";
          // tip.attr("x", e.target.x.baseVal.value + midPoint);
          // tip.attr("y", e.target.y.baseVal.value);
          // tip.text(`${d.value}`);
        })
        .on("mouseout", (e, d) => {
          e.target.style.fill = "red";
          // tip.text("");
        })
        .attr("y", (data, i) => {
          const yVal = y(data.name);
          return yVal ? yVal : null;
        })
        .attr("height", y.bandwidth())
        .attr("width", (d) => x(d.value))
        .attr("fill", "red")
        .attr("x", 0)
        .attr("fill", (d) => color(d.name))
        .transition()
        .duration(500);
      // .attr("y", (d) => x(d.value));
    },
  };
};
