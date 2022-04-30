import { FC, useReducer, useState } from "react";
import {
  CurrentTeamContainer,
  TitleContainer,
  TeamTitleContainer,
  MemberContainer,
} from "./CurrentTeam.style";

const memberss = [
  { name: "Mamhoud sharahili", role: "SV" },
  { name: "Michele Hyde", role: "TM" },
  { name: "Hashem Sami", role: "TM" },
  { name: "Abdul-Mohsin", role: "TM" },
  { name: "Mahendra", role: "TM" },
  { name: "Zyad Dosary", role: "TM" },
  { name: "Fawaz alSaeed", role: "TM" },
  { name: "Ali Alkhunaizi", role: "TM" },
  { name: "Ali Alkhunaizi", role: "TM" },
  { name: "Ali Alkhunaizi", role: "TM" },
  { name: "Ali Alkhunaizi", role: "TM" },
  { name: "Ali Alkhunaizi", role: "TM" },
];
const CurrentTeam: FC = () => {
  const [members, setMembers] = useState(memberss);
  const sv = members.find((m) => m.role === "SV");
  return (
    <CurrentTeamContainer>
      <div>
        <TitleContainer>
          <p>Current Team Members:</p>
        </TitleContainer>
        <TeamTitleContainer>
          <p>Shift Coordinator:</p>
        </TeamTitleContainer>

        <MemberContainer>{sv ? sv.name : ""}</MemberContainer>
      </div>
      <div>
        <TeamTitleContainer>
          <p>Team Members:</p>
        </TeamTitleContainer>
        <MemberContainer>
          {members.map((m, i) => {
            if (!(m.role === "SV")) return <p>{m.name}</p>;
            return <p></p>;
          })}
        </MemberContainer>
      </div>
    </CurrentTeamContainer>
  );
};

export default CurrentTeam;
