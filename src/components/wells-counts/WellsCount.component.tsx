import { FC, useReducer, useState } from "react";
import { CurrentTeamContainer, CountContainer } from "./WellsCounts.styles";

interface WellCountsProps {
  currentflashName: string;
}

const memberss = [
  { name: "Building", count: 15, color: "pink", showName: "building" },
  { name: "Landing", count: 20, color: "red", showName: "landing" },
  { name: "Geosteering", count: 9, color: "#1ec71e", showName: "geosteering" },
  {
    name: "Pilot / Geometric",
    count: 11,
    color: "grey",
    showName: "geometric",
  },
  {
    name: "Rig Operation",
    count: 30,
    color: "yellow",
    showName: "operation",
  },
];
const WellsCounts: FC<WellCountsProps> = ({ currentflashName }) => {
  const [members, setMembers] = useState(memberss);
  return (
    <CurrentTeamContainer>
      {members.map((m) => (
        <CountContainer className={`well_counter ${m.showName}`}>
          <div
            className={`well_type_name`}
            style={{
              backgroundColor: `${m.color}`,
            }}
          >
            {m.name}
          </div>
          <div className={`well_type_count `}>{m.count}</div>
        </CountContainer>
      ))}
    </CurrentTeamContainer>
  );
};

export default WellsCounts;
