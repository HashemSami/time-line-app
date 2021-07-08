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
import { TimelineData, DayObject } from "../../../../models";
import { Data } from "../../../dynamic-form/utils/dataEx";
// import { generateValueTip } from "../../../tooltips/chartsToolTips/valueTips";

export const timeLineWindow = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  chartOptions: ChartOptions
) => {
  const { width, height, margin } = chartOptions;

  const zoomRange = { min: 0.01, max: 6 };
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

  // Add a clipPath: everything out of this area won't be drawn.
  const clip = svg
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0);

  // Create the scatter variable: where both the circles and the brush take place
  const zoom = d3Zoom()
    .scaleExtent([zoomRange.min, zoomRange.max]) // This control how much you can unzoom (x0.5) and zoom (x20)
    .extent([
      [0, 0],
      [width, height],
    ]);

  // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom

  const zoomRect = svg
    .append("g")
    // .attr("clip-path", "url(#clip)")
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0)
    .style("fill", "none")
    .style("pointer-events", "all")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom);

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
      const cuurentDate = new Date();
      const add7Days = after7Days(cuurentDate);

      const x = timeScale([cuurentDate, add7Days], [0, width]);
      // console.log(x(maxDate) / 365);
      // console.log(x.invert(200));

      const xAxisCall = generateBarXAxis();
      // ------------------------------------------------------------
      // // yAxis

      // // here we will set the scale of our bar chart to fit all the data into
      // // our visulaization
      const y = linearScale([1, 10], [height, 0]);

      const yAxisCall = generateBarYAxis();

      // ------------------------------------------------------------
      // draw rects
      // DATA JOIN
      const daysArray: DayObject[] = [];

      const monthsArray: {
        monthName: string;
        year: number;
        jsDate: Date;
      }[] = [];

      // TODO: implement one for loop to loop on the hole year
      // instead of the nested for loop here
      Object.keys(newData["2021"]).forEach(monthNum => {
        const days = newData["2021"][monthNum];
        monthsArray.push({
          monthName: days[0].monthName,
          year: days[0].year,
          jsDate: days[0].jsDate,
        });
        Object.keys(days).forEach(d => {
          daysArray.push(days[d]);
        });
      });

      // const max = getMaxValue(daysArray.map(d=>d.jsDate));
      // const min = getMinValue(daysArray);

      const rects = svg.append("g").attr("clip-path", "url(#clip)");

      // ------------------------------------------------------------
      // EXIT
      rects
        .exit()
        .transition()
        .duration(500)
        .attr("y", height)
        .attr("height", 0)
        .remove();

      // ------------------------------------------------------------
      // UPDATE
      xAxisSvg.transition().duration(500).call(xAxisCall(x));
      yAxisSvg.transition().duration(500).call(yAxisCall(y));

      rects
        .selectAll("rect")
        .data(daysArray)
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

      // ------------------------------------------------------------
      // adding to the enter() phase
      // ENTER
      rects
        .selectAll("rect")
        .data(daysArray)
        .enter()
        .append("rect")
        // .on("mousemove", (e, d) => {
        //   e.target.style.fill = "yellow";
        // })
        // .on("mouseout", (e, d) => {
        //   e.target.style.fill = "red";
        // })
        .attr("x", (data, i, g) => {
          // console.log(g[i]);
          if (data.isCurrentDay) {
            console.log(x(data.jsDate));
            console.log(zoom.scaleTo(zoomRect, 30));
          }

          const xVal = x(data.jsDate);
          return xVal ? xVal : null;
        })
        .attr("fill", "blue")
        .transition()
        .duration(500)
        .attr("y", (data, i) => {
          const xVal = y(5);
          return xVal ? xVal : null;
        })
        .attr("height", 20)
        .attr("width", (data, i) => {
          const xVal = x(maxDate) / 7;
          return xVal ? xVal : null;
        })
        .attr("stroke", "black");
      // ------------------------------------------------------------
      // zoom event
      // zoom.scaleTo(zoomRect, 6);
      // zoom.translateTo();
      // zoom.scaleTo(zoomRect, 30);
      zoom.on("zoom", event => updateChart(event));

      const updateChart = (event: any) => {
        const newX = event.transform.rescaleX(x);
        const newy = event.transform.rescaleY(y);
        // console.log(event);
        xAxisSvg.transition().duration(500).call(xAxisCall(newX));
        yAxisSvg.transition().duration(500).call(yAxisCall(newy));
        // rects.attr("transform", event.transform);

        const zValue = event.transform.k;
        console.log(event.transform.k);

        if (zValue > 0.3) {
          // days display
          rects
            .selectAll("rect")
            .data(daysArray)
            .attr("fill", "none")
            .transition()
            .duration(500)
            .attr("x", (data, i) => {
              const xVal = newX(data.jsDate);
              return xVal ? xVal : null;
            })
            .attr("width", (data, i) => {
              const xVal = (x(maxDate) / 365) * zValue;
              return xVal ? xVal : null;
            })

            .attr("y", (data, i) => {
              const xVal = newy(5);
              return xVal ? xVal : null;
            })

            .attr("fill", d => {
              return d.isCurrentDay ? "yellow" : "blue";
            })
            .attr("stroke", "black");
        } else if (zValue > 0.09) {
          // weeks display
          rects
            .selectAll("rect")
            .data(daysArray)
            .transition()
            .duration(500)
            .attr("width", (data, i) => {
              if (data.jsDate.getDay() === 1) {
                const xVal = (x(maxDate) / 52) * zValue;
                return xVal ? xVal : null;
              }
              return 0;
            })
            .attr("x", (data, i) => {
              if (data.jsDate.getDay() === 1) {
                const xVal = newX(data.jsDate);
                return xVal ? xVal : null;
              }
              return;
            })
            .attr("y", (data, i) => {
              if (data.jsDate.getDay() === 1) {
                const xVal = newy(5);
                return xVal ? xVal : null;
              }
            })
            .attr("fill", d => {
              return d.isCurrentWeek ? "yellow" : "red";
            })
            .attr("stroke", "black");
        } else {
          // months display
          rects
            .selectAll("rect")
            .data(daysArray)
            .transition()
            .duration(500)
            .attr("width", (data, i) => {
              if (data.jsDate.getDate() === 1) {
                const xVal = (x(maxDate) / 12) * zValue;
                return xVal ? xVal : null;
              }
              return 0;
            })
            .attr("x", (data, i) => {
              if (data.jsDate.getDate() === 1) {
                const xVal = newX(data.jsDate);
                return xVal ? xVal : null;
              }
              return;
            })
            .attr("y", (data, i) => {
              if (data.jsDate.getDate() === 1) {
                const xVal = newy(5);
                return xVal ? xVal : null;
              }
            })
            .attr("fill", d => {
              return d.isCurrentMonth ? "yellow" : "green";
            })
            .attr("stroke", "black");
        }
      };
    },
  };
};

const after7Days = (date: Date) => {
  const res = new Date(date);
  res.setDate(res.getDate() + 7);
  return res;
};
