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
// import { generateValueTip } from "../../../tooltips/chartsToolTips/valueTips";

export const kpiChart = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  chartOptions: ChartOptions
) => {
  const { width, height, margin } = chartOptions;

  const radius = Math.min(height - 50, height) / 2;
  // creating pie background

  svg.attr("stroke", "black");

  svg
    .append("g")
    .append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", radius + 10)
    .attr("stroke-width", 5)
    .attr("fill", "cadetblue")
    .attr("stroke", "grey");

  // generates axis labels
  const ChartTitle = svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height / 2 + 50)
    .attr("text-anchor", "middle")
    .attr("style", "font-size:1.8em;");

  const kpiValue = svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height / 2 + 10)
    .attr("text-anchor", "middle")
    .attr("style", "font-size:1.8em")
    .attr("class", "kpi_value");
  // rotating the text will also rotate the x and the y axis
  // that are belong to the text
  // .attr("transform", "rotate(-90)");

  // creating pie chart
  const pie = d3
    .pie<
      | { name: "KPI"; count: number; order: 1 }
      | { name: "full"; count: number; order: 2 }
    >()
    .padAngle(0.005)
    .startAngle(21)
    .endAngle(16.7)
    .sortValues((a, s) => s)
    .sort((d) => d.order)
    .value((d) => d.count);

  const mainArc = d3
    .arc<{ name: "KPI"; count: number } | { name: "full"; count: number }>()
    .innerRadius(40)
    .outerRadius(45)
    .startAngle(10)
    .endAngle(8);

  const pieChart = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // select color domain
  const color = d3
    .scaleOrdinal<string>()
    .domain(["KPI", "full"])
    .range(["url(#KPIGradient)", "white"]);

  const arc = d3.arc();
  // .cornerRadius(2);

  const pieSvg = genrateArcs(svg, ["KPI", "full"], width, height);

  return {
    updateData: (newData: { name: "KPI"; count: number; order: 1 }[]) => {
      ChartTitle.text("KPI");
      kpiValue.text(`${newData[0].count}%`);
      // ------------------------------------------------------------

      const arcs = pieChart
        .selectAll("arc")
        .data(
          pie([
            { name: "full", count: 100 - newData[0].count, order: 2 },
            ...newData,
          ])
        )
        .enter()
        .append("g");

      arcs
        .append("path")
        .attr("d", (d) => {
          const { endAngle, padAngle, startAngle, data } = d;
          return arc({
            innerRadius: 60,
            outerRadius: radius,
            startAngle,
            endAngle,
            padAngle,
          });
        })
        .attr("fill", (d) => color(d.data.name))
        .attr("stroke", "black")
        .attr("class", (d) => (d.data.name === "KPI" ? "arrow_icon" : ""))
        .attr("stroke-width", 2);

      // divPieData.forEach((d) => {
      //   const { endAngle, padAngle, startAngle, data } = d;
      //   const arcs = arc({
      //     innerRadius: 40,
      //     outerRadius: radius,
      //     startAngle,
      //     endAngle,
      //     padAngle,
      //   });

      //   const divPath = pieSvg[data.name].path;

      //   console.log("arscccc", d);
      //   divPath
      //     .attr("stroke", "red")
      //     .attr("fill", "red")
      //     // .attr("class", `val${data}`)
      //     .attr("fill", color(data.name))
      //     .attr("d", arcs ? arcs : "");
      // });
    },
  };
};

const genrateArcs = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  divs: ["KPI", "full"],
  chartWidth: number,
  chartHeight: number
): {
  [div: string]: {
    path: d3.Selection<SVGPathElement, unknown, null, undefined>;
  };
} => {
  const arecObj: {
    [div: string]: {
      path: d3.Selection<SVGPathElement, unknown, null, undefined>;
    };
  } = {};

  const divsGroup = svg.append("g");

  divs.forEach((d, i) => {
    const divPath = divsGroup
      .append("path")
      .attr("class", `${d}`)
      .attr(
        "transform",
        "translate(" + chartWidth / 6 + "," + chartHeight / 2 + ")"
      );
    Object.assign(arecObj, { [d]: { path: divPath } });
  });

  return arecObj;
};
