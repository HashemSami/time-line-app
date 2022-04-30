import { FC } from "react";
import { MainPageContainer, Item } from "./MainPage.styles";

import { Switch, Route } from "react-router-dom";

import { useActions } from "../../hooks/useActions";

import HomePage from "../home-page/HomePage.component";
import MapPage from "../map-page/MapPage.componenet";

const MainPage: FC = () => {
  const { setWeekendDays } = useActions();

  const onSubmit = (model: { weekends: string[]; name: string }) => {
    const weekendsNumbers = model.weekends.map((d) => parseInt(d));
    setWeekendDays(weekendsNumbers);
    console.log(model);
  };

  const handleSttingsOnChange = (values: {
    weekends: string[];
    name: string;
  }) => {
    if (!values) {
      return;
    }
    // const weekendsNumbers = values.weekends.map(d => parseInt(d));
    // setWeekendDays(weekendsNumbers);

    console.log(values);
  };
  return <MainPageContainer></MainPageContainer>;
};

export default MainPage;
