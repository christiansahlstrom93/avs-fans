import { Route, Switch, BrowserRouter } from "react-router-dom";
import { PlayersContextProvider } from "./contexts/PlayersContext";
import { PlayerDetailsContextProvider } from "./contexts/PlayerDetailsContext";
import Homepage from "./components/homepage/Homepage";
import PlayerDetails from "./components/players/PlayerDetails";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { index, playerDetails } from "./routes";
import { ScheduleContextProvider } from "./contexts/ScheduleContext";
import { LeagueStatsContextProvider } from "./contexts/LeagueStatsContext";
import "./App.css";
import { PointSummaryContextProvider } from "./contexts/PointSummaryContext";
import Schedule from "./components/schedule/Schedule";
import { ConfigContextProvider } from "./contexts/ConfigContext";
import { SimulationContextProvider } from "./contexts/SimulationContext";
import Simulation from "./components/schedule/Simulation";
import "./App.css";
import { NewsContextProvider } from "./contexts/newsContext";

const App = () => {
  const isMobile = () => window.innerWidth <= 800;

  if (!isMobile()) {
    return (
      <div className="warning">
        <img className="phoneImg" src="/logos/iphone.png" />
        <span className="phoneText">
          This application is for mobile devices only
        </span>
      </div>
    );
  }

  return (
    <SimulationContextProvider>
      <ConfigContextProvider>
        <PlayersContextProvider>
          <PointSummaryContextProvider>
            <PlayerDetailsContextProvider>
              <ScheduleContextProvider>
                <LeagueStatsContextProvider>
                  <NewsContextProvider>
                  <Header />
                  <Schedule />
                  <Simulation />
                  <BrowserRouter basename="/">
                    <Switch>
                      <Route exact path={index} component={Homepage} />
                      <Route
                        exact
                        path={playerDetails}
                        component={PlayerDetails}
                      />
                    </Switch>
                  </BrowserRouter>
                  <Footer />
                  </NewsContextProvider>
                </LeagueStatsContextProvider>
              </ScheduleContextProvider>
            </PlayerDetailsContextProvider>
          </PointSummaryContextProvider>
        </PlayersContextProvider>
      </ConfigContextProvider>
    </SimulationContextProvider>
  );
};

export default App;
