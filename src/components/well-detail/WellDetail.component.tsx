import { FC, useEffect, useState, useRef } from "react";
import {
  WellDetailContainer,
  WellContainer,
  TitleContainer,
  DetailContainer,
  DetailTypeContainer,
} from "./WellDetail.styles";

const wells = Array.from({ length: 20 }, (_, i) => {
  const colors = ["yellow", "#1ec71e", "red", "pink", "grey"];
  const randomColor = Math.floor(Math.random() * 5);
  return {
    color: colors[randomColor],
    wellData: { wellName: `HRDH_2232_${i}`, depth: 1223, gName: "Hashem" },
  };
});

let index = 0;
const WellDetail: FC = () => {
  const [member, setMember] = useState(wells[0]);
  const requestRef = useRef<any>();
  const divRef = useRef<HTMLDivElement | null>(null);

  const scrollElement = () => {
    if (wells[index + 1]) {
      setMember(wells[index + 1]);
      index++;
    } else {
      index = 0;
      setMember(wells[0]);
    }
  };
  useEffect(() => {
    divRef?.current?.classList.toggle("fade");
  }, [member]);

  const generateCard = (
    data: {
      color: string;
      wellData: { wellName: string; depth: number; gName: string };
    },
    classN: string
  ) => {
    const { color, wellData } = data;
    return (
      <WellContainer ref={divRef} className={classN}>
        <TitleContainer style={{ backgroundColor: color }}>
          <p>{wellData.wellName}</p>
        </TitleContainer>

        <DetailContainer>
          <DetailTypeContainer>
            <p>Gologist</p>
            <p>Depth</p>
          </DetailTypeContainer>
          <div>
            <p>{wellData.gName}</p>
            <p>22345 ft</p>
          </div>
        </DetailContainer>
      </WellContainer>
    );
  };

  useEffect(() => {
    requestRef.current = setInterval(scrollElement, 5000);
    return () => {
      console.log("interval cleared");
      return clearInterval(requestRef.current);
    };
  }, []);

  return <WellDetailContainer>{generateCard(member, "")}</WellDetailContainer>;
};

export default WellDetail;
