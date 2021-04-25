import styled, { css } from "styled-components";
import { ReactComponent as Icon } from "../../../icons/date-icon2.svg";

interface IconStyleProps {
  isCurrentDay: boolean;
}

const isCurrentDayStyles = css`
  path {
    fill: gold;
  }
`;

const getIconStyles = (props: IconStyleProps) => {
  if (props.isCurrentDay) {
    console.log(props.isCurrentDay);
    return isCurrentDayStyles;
  }
};

export const DateIconContainer = styled.div`
  /* background-color: green; */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
`;
export const DateIcon = styled(Icon)<IconStyleProps>`
  /* background-color: green; */
  width: 50px;
  height: 50px;
  ${getIconStyles}
`;

export const DayNameDisplay = styled.div`
  position: absolute;
  font-size: 0.9rem;
  top: 7px;
`;

export const DayNumberDisplay = styled.div`
  position: absolute;
  font-size: 1rem;
  bottom: 7px;
`;
