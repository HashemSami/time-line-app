import styled from "styled-components";

export const HeaderContainer = styled.div`
  grid-column: col 1 / col 13;
  grid-row: header;
  color: white;
  background-color: #2f4f4f;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 50px;
  font-size: 1.2em;
  font-weight: bold;
`;

export const TitleContainer = styled.div`
  font-size: 2em;
  margin: auto 0;
  p {
    margin: 0;
  }
`;

export const WellsCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  font-size: 2em;
  /* margin: auto 0; */
  text-align: center;

  p {
    margin: 0;
    padding: 0 50px;
  }
  .title {
    background-color: grey;
    -moz-box-shadow: inset 0 0 10px #000000;
    -webkit-box-shadow: inset 0 0 10px #000000;
    box-shadow: inset 0 0 10px #000000;
    text-shadow: 2px 2px 8px #ff0000;

    animation: flashing 2s ease-out infinite;
    @keyframes flashing {
      50% {
        text-shadow: none;
        /* fill: white ; */
        /* stroke-width: 3px; */
      }
    }
  }
`;
