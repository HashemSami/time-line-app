import styled from "styled-components";

export const CurrentTeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 1.3em;
  padding: 0 20px;
  text-align: center;
  color: black;
  font-weight: bold;
  /* margin: auto 0; */

  height: 100%;

  .show {
    transition: All 1s;
    border-radius: 8px;

    border: 6px solid yellow;
  }
`;

export const CountContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 6px solid #2f4f4f;
  border-radius: 8px;

  /* justify-content: center; */
  .well_type_name {
    padding: 10px;
    border-radius: 6px 6px 0 0;
    -webkit-text-stroke: 1.11px black; /* stroke width and color */
    color: rgb(255, 255, 255);
    -webkit-font-smoothing: antialiased;
    font-weight: bold;
  }
  .well_type_count {
    /* color: white; */
    padding: 0 20px;
    border-radius: 0 0 6px 6px;
    background-color: white;
  }
`;
