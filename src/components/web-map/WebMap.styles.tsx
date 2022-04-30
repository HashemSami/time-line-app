import styled, { css } from "styled-components";

interface ChartContainerProps {
  width: number;
  height: number;
  currentflashName: string;
}

interface WAProps {
  currentflashName: string;
}

const setWidthAndHeight = (props: ChartContainerProps) => {
  return css`
    width: ${props.width};
    height: ${props.height};
  `;
};

export const DynamicChartContainer = styled.div<ChartContainerProps>`
  grid-column: col 1 / col 13;
  grid-row: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  svg {
    width: 100%;
    height: auto;
    stroke: black;
  }
  .building_well {
    path {
      fill: pink;
    }
  }
  .landing_well {
    path {
      fill: red;
    }
  }
  .geosteering_well {
    path {
      fill: #1ec71e;
    }
  }
  .geomitric_well {
    path {
      fill: grey;
    }
  }
  .operation_well {
    path {
      fill: yellow;
    }
  }
  .show {
    svg {
      transform: scale(1.2);
      /* transition: All 0.5s; */
    }
  }
  .no_show {
    svg {
      /* transform: scale(1); */
      display: none;
    }
  }
`;

export const WebMapConTainer = styled.div<WAProps>``;
