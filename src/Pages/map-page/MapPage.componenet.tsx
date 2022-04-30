import { FC, useEffect, useState, useRef } from "react";
import {
  MapPageContainer,
  Item,
  MapContainer,
  KpiContainer,
  TeamContainer,
  BarChartContainer,
  ProgressChartContainer,
} from "./MapPage.styles";

import { useActions } from "../../hooks/useActions";

import WebMap from "../../components/web-map/WebMap.component";
import SideBarChart from "../../components/charts/side-bar-chart/SideBarChart.component";
import KpiChart from "../../components/charts/kpi-chart/KpiChart.component";
import ProgressChart from "../../components/charts/progress-chart/ProgressChart.component";
import CurrentTeam from "../../components/current-members/CurrentTeam.component";
import WellsCounts from "../../components/wells-counts/WellsCount.component";
import WellDetail from "../../components/well-detail/WellDetail.component";

const currentFlash: [string, boolean][] = [
  ["building", true],
  ["landing", false],
  ["geosteering", false],
  ["geometric", false],
  ["operation", false],
];

let currentflashName = "building";

const MapPage: FC = () => {
  const [currentShow, setCurrentShow] = useState("");
  const requestRef = useRef<any>();

  useEffect(() => {
    const svgEle = document.getElementsByClassName("well_icon");
    const counterEle = document.getElementsByClassName("well_counter");
    requestRef.current = setInterval(() => {
      for (let i = 0; i <= currentFlash.length; i++) {
        const item = currentFlash[i];
        if (item[1]) {
          item[1] = false;
          if (currentFlash[i + 1]) {
            currentFlash[i + 1][1] = true;
            // setCurrentShow(currentFlash[i + 1][0]);
            currentflashName = currentFlash[i + 1][0];
          } else {
            currentFlash[0][1] = true;
            // setCurrentShow(currentFlash[0][0]);
            currentflashName = currentFlash[0][0];
          }

          break;
        }
      }
      console.log(currentflashName);

      for (let i = 0; i <= counterEle.length; i++) {
        if (counterEle[i]?.classList.contains(`${currentflashName}`)) {
          counterEle[i]?.classList.add("show");
        } else {
          counterEle[i]?.classList.remove("show");
        }
      }
      for (let i = 0; i <= svgEle.length; i++) {
        if (svgEle[i]?.classList.contains(`${currentflashName}_well`)) {
          svgEle[i]?.classList.add("show");
          svgEle[i]?.classList.remove("no_show");
        } else {
          svgEle[i]?.classList.remove("show");
          svgEle[i]?.classList.add("no_show");
        }
      }

      // console.log(currentShow);
    }, 4000);

    return () => {
      console.log("interval cleared");
      return clearInterval(requestRef.current);
    };
  }, []);

  return (
    <MapPageContainer>
      <Item>
        <MapContainer>
          <WebMap height={200} width={200} currentflashName={currentShow} />
        </MapContainer>
        <KpiContainer>
          <KpiChart width={200} height={250} updateFunction={() => {}} />
        </KpiContainer>
        <TeamContainer>
          <WellDetail />
        </TeamContainer>
        <BarChartContainer>
          <WellsCounts currentflashName={currentShow} />
          {/* <SideBarChart width={200} height={250} updateFunction={() => {}} /> */}
        </BarChartContainer>
        <ProgressChartContainer>
          <ProgressChart width={200} height={100} updateFunction={() => {}} />
        </ProgressChartContainer>
      </Item>
    </MapPageContainer>
  );
};

export default MapPage;
