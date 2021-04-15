import { FC } from "react";
import { HomePageContainer, Item } from "./HomePage.styles";

import TestGame from "../../components/test-game/TestGame.component";

const HomePage: FC = () => {
  return (
    <HomePageContainer>
      <Item>
        <TestGame />
      </Item>
      {/* <Item>item2</Item>
      <Item>item3</Item>
      <Item>item4</Item>
      <Item>item5</Item>
      <Item>item6</Item>
      <Item>item7</Item>
      <Item>item8</Item>
      <Item>item9</Item>
      <Item>item10</Item>
      <Item>item11</Item>
      <Item>item12</Item>
      <Item>item12</Item>
      <Item>item12</Item> */}
    </HomePageContainer>
  );
};

export default HomePage;
