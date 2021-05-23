const data = {
  Australia: 1000,
  India: 2700,
  USA: 500,
  Brasil: 2100,
  China: 3000,
};

const data2 = [
  ["Australia", 1000],
  ["India", 2700],
  ["USA", 500],
  ["Brasil", 2100],
  ["China", 3000],
];

const canvas = document.querySelector("canvas");

canvas.width = 500;
canvas.height = 500;

// const ctx = canvas.getContext("2d");
// ----------------------------------------

const drawGrids = (ctx, width, height, cellWidth, cellHeight, setChartOptions) => {
  ctx.beginPath();

  console.log(width, height);

  for (let nextXGrid = cellHeight; nextXGrid < height; nextXGrid += cellHeight) {
    ctx.moveTo(0, nextXGrid);
    ctx.lineTo(width, nextXGrid);
  }

  for (let nextYGrid = cellWidth; nextYGrid < width; nextYGrid += cellWidth) {
    ctx.moveTo(nextYGrid, 0);
    ctx.lineTo(nextYGrid, height);
  }

  ctx.strokeStyle = "grey";
  ctx.stroke();

  const moveToBlockX = blocksX(cellWidth);
  const moveToBlockY = blocksY(cellHeight);

  setChartOptions({ cellHeight, cellWidth, moveToBlockX, moveToBlockY });
};
// ----------------------------------------

// this function will return the position inside the canvas based in the number os cells inside the chart
const blocksX = cellHeight => count => count * cellHeight;

const blocksY = cellWidth => count => count * cellWidth;

const drawAxis = (xBlockPos, yBlockPos, xAxLength, yAxLength, ctx, chartOptions, setChartOptions) => {
  const { moveToBlockX, moveToBlockY } = chartOptions;

  const xAxisLength = xBlockPos + xAxLength;
  const yAxisLength = yBlockPos + yAxLength;

  setChartOptions({ xBlockPos, yBlockPos, xAxisLength, yAxisLength });

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(moveToBlockX(xBlockPos), moveToBlockY(yBlockPos));
  // line for the Y axis
  ctx.lineTo(moveToBlockX(xBlockPos), moveToBlockY(yAxisLength));
  // line for the X axis
  ctx.lineTo(moveToBlockX(xAxisLength), moveToBlockY(yAxisLength));

  ctx.stroke();
};

// ----------------------------------------

const drawAsixValues = (minValue, maxValue, seperation, ctx, chartOptions, setChartOptions) => {
  const { xBlockPos, yBlockPos, xAxisLength, yAxisLength, moveToBlockX, moveToBlockY } = chartOptions;

  const plotNumbers = maxValue / seperation;

  const plotNumbersLength = (yAxisLength - yBlockPos) / plotNumbers;

  const blockValue = (yAxisLength - yBlockPos) / maxValue;
  console.log("block value", blockValue);

  // at this point the pointer is at the end of the x axis
  // we need to bring it to the begining of the line to be able to right the numbers on the axis
  ctx.moveTo(moveToBlockX(xBlockPos), moveToBlockY(yAxisLength));

  // console.log(plotNumbersLength, plotNumbers + 1);

  const yAxisNumbers = Array.from({ length: plotNumbers + 1 }, (_, i) => {
    const currentSeperation = i * seperation;

    // console.log(currentSeperation);

    ctx.strokeText(currentSeperation, moveToBlockX(xBlockPos - 3), moveToBlockY(yAxisLength - plotNumbersLength * i));

    return currentSeperation;
  });

  ctx.stroke();

  setChartOptions({ blockValue });
};

// ----------------------------------------

const drawLineChart = (data, ctx, chartOptions) => {
  const { xBlockPos, yBlockPos, xAxisLength, yAxisLength, moveToBlockX, moveToBlockY, blockValue } = chartOptions;

  const plotNumbersLength = (xAxisLength - xBlockPos) / data.length;
  // console.log(plotNumbersLength);

  ctx.beginPath();
  ctx.strokeStyle = "black";
  // first will move the pointer to the point wher we want to start drawing the chart
  // which is the in this case on the 0 value of both x and y axis
  ctx.moveTo(moveToBlockX(xBlockPos), moveToBlockY(yAxisLength));

  data.forEach((d, i) => {
    const currentSeperation = (i + 1) * plotNumbersLength + xBlockPos - 1;

    const [title, value] = d;

    const valueInBlocks = value * blockValue;
    // console.log(valueInBlocks, currentSeperation);

    ctx.strokeText(title, moveToBlockX(currentSeperation - 1), moveToBlockY(yAxisLength + 3));
    ctx.lineTo(moveToBlockX(currentSeperation), moveToBlockY(yAxisLength - valueInBlocks));
    ctx.strokeText(value, moveToBlockX(currentSeperation - 1), moveToBlockY(yAxisLength - valueInBlocks - 1.5));
    ctx.arc(moveToBlockX(currentSeperation), moveToBlockY(yAxisLength - valueInBlocks), 2, 0, Math.PI * 2, true);
  });

  ctx.stroke();
};
// ----------------------------------------

const drawBarChart = (data, ctx, chartOptions) => {
  const { xBlockPos, yBlockPos, xAxisLength, yAxisLength, moveToBlockX, moveToBlockY, blockValue } = chartOptions;

  const plotNumbersLength = (xAxisLength - xBlockPos) / data.length;
  // console.log(plotNumbersLength);
  ctx.beginPath();
  ctx.strokeStyle = "black";
  // first will move the pointer to the point wher we want to start drawing the chart
  // which is the in this case on the 0 value of both x and y axis
  ctx.moveTo(moveToBlockX(xBlockPos), moveToBlockY(yAxisLength));

  data.forEach((d, i) => {
    const currentSeperation = (i + 1) * plotNumbersLength + xBlockPos - 1;

    const [title, value] = d;

    const valueInBlocks = value * blockValue;
    // console.log(valueInBlocks, currentSeperation);

    ctx.strokeText(title, moveToBlockX(currentSeperation - 1), moveToBlockY(yAxisLength + 3));
    ctx.rect(moveToBlockX(currentSeperation - 1), moveToBlockY(yAxisLength), 20, moveToBlockY(-valueInBlocks));
    ctx.strokeText(value, moveToBlockX(currentSeperation - 1), moveToBlockY(yAxisLength - valueInBlocks - 1.5));
  });

  ctx.stroke();
};

// ----------------------------------------
const chart = canvas => {
  const ctx = canvas.getContext("2d");

  const chartOptions = {
    cellHeight: 10,
    cellWidth: 10,
    xBlockPosP: 5,
    yBlockPos: 5,
    xAxisLength: 40,
    yAxisLength: 40,
  };

  const getChartOptions = () => chartOptions;
  const setChartOptions = option => Object.assign(chartOptions, option);

  const width = canvas.width;
  const height = canvas.height;

  return {
    drawGrids: (cellWidth, cellHeight) => drawGrids(ctx, width, height, cellWidth, cellHeight, setChartOptions),
    drawAxis: (xBlockPos = 5, yBlockPos = 2, xAxLength = 20, yAxLength = 20) => drawAxis(xBlockPos, yBlockPos, xAxLength, yAxLength, ctx, getChartOptions(), setChartOptions),
    drawAsixValues: (minValue = 0, maxValue = 100, seperation = 10) => drawAsixValues(minValue, maxValue, seperation, ctx, getChartOptions(), setChartOptions),
    drawLineChart: data => drawLineChart(data, ctx, chartOptions),
    drawBarChart: data => drawBarChart(data, ctx, chartOptions),
  };
};

// ======================================================================

const chartObject = chart(canvas);

// drawGrids(cellWidth, cellHeight)
chartObject.drawGrids(20, 10);

// drawAxis(xPosition, yPosition, xAxisLength, yAsixLength )
chartObject.drawAxis(5, 5, 15, 30);

// drawAsixValues(minValue, maxValue, seperation)
chartObject.drawAsixValues(300, 3000, 600);

// drawLineChart(data : [[title, value]])
// chartObject.drawLineChart(data2);

// drawBarChart(data : [[title, value]])
chartObject.drawBarChart(data2);
