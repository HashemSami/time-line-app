import { AppContainer } from "./App.styles";
import HomePage from "./Pages/home-page/HomePage.component";
import Header from "./components/header/Header.component";
import Footer from "./components/footer/Footer.component";

function App() {
  return (
    <AppContainer className="App">
      <Header />
      <HomePage />
      <Footer />
    </AppContainer>
  );
}

export default App;
