import styled from "styled-components";

export const FooterContainer = styled.div`
  grid-column: col 1 / col 13;
  grid-row: footer;
  background-color: #a9a9a9;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const WellsScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;

  background-color: #2f4f4f;
  padding: 10px 0;
  box-shadow: 3px 2px #888888;

  p {
    margin: 0;
    padding: 3px 30px;
    /* border-right: 2px solid white; */
    /* border-left: 2px solid gray; */
    margin-left: 4px;
    color: black;
    font-weight: bold;
  }
`;
