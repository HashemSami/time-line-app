import {
  linearScale,
  bandScale,
  getMaxValue,
  generateBarXAxis,
  generateBarYAxis,
  getMinValue,
  timeScale,
  d3Zoom,
} from "../../../../services/d3";
import { ChartOptions } from "../models";
import { TimelineData } from "../../../../models";
import { Data } from "../../../dynamic-form/utils/dataEx";
// import { generateValueTip } from "../../../tooltips/chartsToolTips/valueTips";

export const timeLineWindow = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  chartOptions: ChartOptions
) => {
  const { width, height, margin } = chartOptions;

  // console.log(width, height);

  const innerMargin = { top: 20, bottom: 20, right: 20, left: 20 };

  const windowHeight = height / 2;

  const topWindowLocation = margin.top;
  const bottomWindowLocation = windowHeight;
  const innerWidth = width - margin.left - margin.right;
  const innerTopHeight = windowHeight - margin.top;
  const innerBottomHeight = windowHeight - margin.bottom;

  const xAxisSvg = svg
    .append("g")
    .attr("transform", `translate(0, ${height + margin.top})`);

  const yAxisSvg = svg.append("g");

  // const tip = generateValueTip(svg, -10);

  // Add a clipPath: everything out of this area won't be drawn.
  const clip = svg
    .append("g")
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0);

  // Create the scatter variable: where both the circles and the brush take place
  // const rects = svg.append("g").attr("clip-path", "url(#clip)");

  const zoom = d3Zoom()
    .scaleExtent([0.5, 20]) // This control how much you can unzoom (x0.5) and zoom (x20)
    .extent([
      [0, 0],
      [width, height],
    ]);

  // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
  const zoomRect = svg
    .append("g")
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0)
    .style("fill", "none")
    .style("pointer-events", "all")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom);

  const rectWidth = width / 365;

  return {
    updateData: (
      newData: TimelineData,
      dateRange: [minDate: Date, maxDate: Date]
    ) => {
      const [minDate, maxDate] = dateRange;
      // ChartTitle.text("Bar Chart Title");
      // NavChartTitle.text("Axis Title");
      // ------------------------------------------------------------
      // xAxis
      // will also do the scaling for the x values (the fields names)

      const x = timeScale([minDate, maxDate], [0, width]);
      console.log(x(maxDate) / 365);
      console.log(x.invert(200));

      const xAxisCall = generateBarXAxis();
      // xAxisSvg.call(xAxisCall);

      // ------------------------------------------------------------
      // // yAxis
      // const max = getMaxValue(newData);
      // const min = getMinValue(newData);
      // // here we will set the scale of our bar chart to fit all the data into
      // // our visulaization
      const y = linearScale([1, 10], [height, 0]);

      const yAxisCall = generateBarYAxis();
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

      const daysArray: {
        dayIndex: number;
        dayNumber: number;
        dayValue: number;
        dayString: string;
        dayShortSrting: string;
        monthName: string;
        year: number;
        isCurrentDay: boolean;
        isWeekend: boolean;
        jsDate: Date;
      }[] = [];

      // TODO: implement one for loop to loop on the hole year
      // instead of the nested for loop here
      Object.keys(newData["2021"]).forEach((monthNum) => {
        const days = newData["2021"][monthNum];
        Object.keys(days).forEach((d) => {
          daysArray.push(days[d]);
        });
      });

      const rects = svg
        .append("g")
        .attr("clip-path", "url(#clip)")
        .selectAll("rect")
        .data(daysArray);
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

      xAxisSvg.transition().duration(500).call(xAxisCall(x));
      yAxisSvg.transition().duration(500).call(yAxisCall(y));

      rects
        .transition()
        .duration(500)

        .attr("x", (data, i) => {
          const xVal = x(data.jsDate);
          return xVal ? xVal : null;
        })
        .attr("y", (data, i) => {
          const xVal = y(5);
          return xVal ? xVal : null;
        })
        .attr("height", 20)
        .attr("width", (data, i) => {
          const xVal = x(maxDate) / 365;
          return xVal ? xVal : null;
        });

      // adding to the enter() phase
      // ENTER
      rects
        .enter()
        .append("rect")
        .on("mousemove", (e, d) => {
          e.target.style.fill = "yellow";
        })
        .on("mouseout", (e, d) => {
          e.target.style.fill = "red";
        })
        .attr("x", (data, i) => {
          const xVal = x(data.jsDate);
          return xVal ? xVal : null;
        })
        .attr("fill", "red")
        .transition()
        .duration(500)
        .attr("y", (data, i) => {
          const xVal = y(5);
          return xVal ? xVal : null;
        })
        .attr("height", 20)
        .attr("width", (data, i) => {
          const xVal = x(maxDate) / 365;
          return xVal ? xVal : null;
        });

      zoom.on("zoom", (event) => updateChart(event));

      const updateChart = (event: any) => {
        const newX = event.transform.rescaleX(x);
        const newy = event.transform.rescaleY(y);
        // console.log(event);
        xAxisSvg.transition().duration(500).call(xAxisCall(newX));
        yAxisSvg.transition().duration(500).call(yAxisCall(newy));
        // clip.attr("transform", event.transform);

        rects
          // .append("rect")
          // .attr("transform", event.transform)
          .attr("y", (data, i) => {
            const xVal = newy(5);
            return xVal ? xVal : null;
          })
          .attr("x", (data, i) => {
            const xVal = newX(data.jsDate);
            return xVal ? xVal : null;
          })
          .attr("width", (data, i) => {
            const xVal = newX(maxDate) / 365;
            return xVal ? xVal : null;
          });

        // const newY = event.transform.rescaleY(y);
      };
    },
  };
};
