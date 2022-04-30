import { FC } from "react";

import {
  HeaderContainer,
  WellsCountContainer,
  TitleContainer,
} from "./Header.styles";

const Header: FC = () => {
  return (
    <HeaderContainer>
      <TitleContainer>
        <p>GOC Operations Activity</p>
      </TitleContainer>
      <WellsCountContainer>
        <p className="title">98 Active Wells</p>
      </WellsCountContainer>
    </HeaderContainer>
  );
};

export default Header;
