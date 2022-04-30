import styled from "styled-components";

export const CurrentTeamContainer = styled.div`
  /* position: relative; */
  height: 100%;
  p {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const TitleContainer = styled.div`
  padding: 5px;
  background-color: darkred;
  border-bottom: 2px solid white;
  width: 90%;
`;

export const TeamTitleContainer = styled.div`
  padding: 5px;
  background-color: cadetblue;
  margin-top: 5px;
  width: 90%;
`;

export const MemberContainer = styled.div`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 5px;
  color: black;
  background-color: white;
  border-bottom: 2px solid white;
  overflow: auto;
  width: 90%;
`;
