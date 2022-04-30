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

export const KpiChartContainer = styled.div<ChartContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  svg {
    /* stroke: black; */
    text {
      fill: white;
      font-weight: bold;
      stroke-width: 1.5;
      stroke: black;
    }
    .kpi_value {
      fill: white;
      font-weight: bolder;
    }
  }

  .arrow_icon {
    animation: hideshow 2s ease infinite;
  }
  @keyframes hideshow {
    0% {
      stroke: orange;
    }
    10% {
      stroke: #333333;
    }
    50% {
      stroke: #313131;
    }
    100% {
      stroke: #292828;
    }
  }
`;
