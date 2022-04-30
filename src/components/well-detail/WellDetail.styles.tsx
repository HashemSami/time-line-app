import styled from "styled-components";

export const WellDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* font-size: 1.1em; */
  padding: 0 20px;
  text-align: center;
  color: black;
  font-weight: bold;
  /* margin: auto 0; */

  height: 100%;
  transition: visibility 0s, opacity 0.5s linear;

  .show {
    transition: All 1s;
    border-radius: 8px;

    border: 6px solid yellow;
  }
  .fade {
    animation: fadein ease 1s;

    @keyframes fadein {
      0% {
        opacity: 0;
        transform: scale(1.1);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
`;

export const WellContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 6px solid gray;
  border-radius: 8px;
  /* height: 50%; */

  width: 95%;

  p {
    margin: 0;
    padding: 10px 5px;
  }

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

export const TitleContainer = styled.div`
  width: 100%;
  -webkit-text-stroke: 1.11px black; /* stroke width and color */
  color: rgb(255, 255, 255);
  -webkit-font-smoothing: antialiased;
  font-weight: bold;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  text-align: start;
  font-size: smaller;
  height: 100%;
  /* width: 100%; */
  background-color: white;
`;

export const DetailTypeContainer = styled.div`
  background-color: cadetblue;
  color: white;
  border-right: 1px solid black;
`;
