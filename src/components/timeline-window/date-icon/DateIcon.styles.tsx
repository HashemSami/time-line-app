import styled, { css } from "styled-components";
import { ReactComponent as Icon } from "../../../icons/date-icon2.svg";

interface IconStyleProps {
  isCurrentDay: boolean;
  isWeekend: boolean;
}

const isCurrentDayStyles = css`
  path {
    fill: gold;
  }
`;

const isWeekendStyles = css`
  path {
    fill: green;
  }
`;

const getIconStyles = (props: IconStyleProps) => {
  if (props.isCurrentDay) {
    // console.log(props.isCurrentDay);
    return isCurrentDayStyles;
  }
  if (props.isWeekend) {
    return isWeekendStyles;
  }
};

export const DateIconContainer = styled.div<IconStyleProps>`
  /* background-color: green; */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;

  svg {
    width: 50px;
    height: 50px;
    ${getIconStyles}
  }
`;
// export const DateIcon = styled.div<IconStyleProps>`
//   /* background-color: green; */
//   svg {
//     width: 50px;
//     height: 50px;
//     ${getIconStyles}
//   }
// `;

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
