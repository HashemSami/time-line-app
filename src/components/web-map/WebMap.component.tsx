import { FC, useEffect, useRef, useState } from "react";
import { DynamicChartContainer, WebMapConTainer } from "./WebMap.styles";

import { map } from "./leaflet-map";

interface MapProps {
  width: number;
  height: number;
  currentflashName: string;
}

const WebMap: FC<MapProps> = ({ width, height, currentflashName }) => {
  const chartDiv = useRef<HTMLDivElement | null>(null);

  const [barC, setBarC] = useState<any>();
  const [mapState, setMapState] = useState<any>();

  useEffect(() => {
    if (!chartDiv.current) {
      return;
    }

    const myMap = map(chartDiv.current);
    setMapState(myMap);
    myMap.createTiles();
    myMap.getLatlngClickEvent();
    myMap.creatWells();
  }, []);

  return (
    <DynamicChartContainer
      currentflashName={currentflashName}
      ref={chartDiv}
      width={width}
      height={height}
    >
      <WebMapConTainer
        currentflashName={currentflashName}
        ref={chartDiv}
      ></WebMapConTainer>
    </DynamicChartContainer>
  );
};

export default WebMap;
