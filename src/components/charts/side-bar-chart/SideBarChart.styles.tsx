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

export const BarChartContainer = styled.div<ChartContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  text {
    fill: white;
  }
`;
