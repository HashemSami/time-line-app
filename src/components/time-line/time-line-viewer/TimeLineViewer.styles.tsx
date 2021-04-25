import styled from "styled-components";

export const TimeLineContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, [col] 1fr);
  grid-auto-rows: minmax(100px, auto);
  /* justify-content: center;
  justify-items: stretch;
  align-items: stretch; */
  column-gap: 2vw;
  row-gap: 2vh;
  /* grid-column: col 3 / col 11; */
  /* grid-row: header; */
  background-color: #9a2d98;
`;
