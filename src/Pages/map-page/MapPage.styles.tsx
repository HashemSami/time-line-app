import styled, { css } from "styled-components";
import { chartsColor } from "../../styles/colors";

export const MapPageContainer = styled.div`
  grid-row: main-body;
  grid-column: col 1 / col 13;
  /* min-height: 100%; */
  background-color: skyblue;
  display: grid;
  grid-template-columns: repeat(12, [col] 1fr);
  grid-auto-rows: minmax(100px, auto);
  justify-content: center;
  justify-items: stretch;
  align-items: stretch;
  /* row-gap: 2vh; */
  /* align-content: stretch; */
  /* column-gap: 2vw;
  row-gap: 2vh; */
`;

export const Item = styled.div`
  grid-column: col 1 / col 13;
  /* grid-row: header; */
  height: calc(100vh - 145px);
  /* min-height: 100%; */

  background-color: #a9a9a9;
  display: grid;
  grid-template-columns: repeat(12, [col] 1fr);
  grid-template-rows: repeat(12, [roww] 1fr);
  justify-content: center;
  justify-items: stretch;
  align-items: stretch;
  /* align-content: stretch; */
  column-gap: 0.5vw;
  row-gap: 2vh;
  min-height: 100%;
  color: white;

  @media (min-width: 901px) {
    grid-column: col 1 / col 13;
  }
`;

const border = () => {
  return css`
    border-radius: 5px;
    box-shadow: 3px 2px #888888;
    /* opacity: 0.5; */
  `;
};
export const MapContainer = styled.div`
  background-color: ${chartsColor.background};
  grid-column: col 3 / col 11;
  grid-row: roww 4 / roww 13;
`;

export const KpiContainer = styled.div`
  grid-column: col 1 / col 3;
  grid-row: roww 1 / roww 6;
  background-color: ${chartsColor.background};
  margin-top: 10px;
  ${border}
`;

export const TeamContainer = styled.div`
  grid-column: col 1 / col 3;
  grid-row: roww 6 / roww 13;
  background-color: ${chartsColor.background};
  margin-bottom: 10px;
  ${border}
`;

export const BarChartContainer = styled.div`
  grid-column: col 11 / col 13;
  grid-row: roww 1 / roww 13;
  background-color: ${chartsColor.background};
  margin-top: 10px;
  margin-bottom: 10px;
  ${border}
`;

export const ProgressChartContainer = styled.div`
  grid-column: col 3 / col 11;
  grid-row: roww 1 / roww 4;
  background-color: ${chartsColor.background};
  margin-top: 10px;
  ${border}
`;
