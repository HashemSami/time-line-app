import { FC } from "react";
import { AppContainer } from "./App.styles";

import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/header/Header.component";
import Footer from "./components/footer/Footer.component";

import HomePage from "./Pages/home-page/HomePage.component";
import MapPage from "./Pages/map-page/MapPage.componenet";

const App: FC = () => {
  return (
    <AppContainer className="App">
      <Switch>
        <Route path="/main">
          <HomePage />
        </Route>
        <Route path="/map">
          <Header />
          <MapPage />
          <Footer />
        </Route>
      </Switch>
    </AppContainer>
  );
};

export default App;
