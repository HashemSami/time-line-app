import styled, { css } from "styled-components";

interface ChartContainerProps {
  width: number;
  height: number;
}

const setWidthAndHeight = (props: ChartContainerProps) => {
  return css`
    /* width: ${props.width}; */
    height: ${props.height};
  `;
};

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  background-color: maroon;
  border-bottom: 2px solid white;
  font-size: 1.2em;
  font-weight: bold;
  padding-left: 10px;
  svg {
    height: 100%;
    fill: yellow;
  }
  p {
    margin: 0;
    padding-left: 10px;
    padding-top: 2px;
  }
`;

export const ProgressChartContainer = styled.div<ChartContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  text {
    fill: white;
  }
  .wells_value {
    fill: yellow;
    font-weight: bold;

    /* animation: flashing 2s ease infinite; */
  }
  .chart_title {
    font-size: 1.8em;
  }
  .arrow_icon {
    animation: blinking 1s ease infinite;
  }
  @keyframes blinking {
    50% {
      transform: translate(0, -5px);
    }
  }

  @keyframes flashing {
    50% {
      stroke: rgba(255, 0, 0, 1);
      /* fill: white ; */
      /* stroke-width: 3px; */
    }
  }
`;
